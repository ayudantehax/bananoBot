
String.prototype.rjust = function(width, padding) {
  padding = padding || " ";
  padding = padding.substr(0, 1); /* www .  jav a 2  s. co m*/
  if (this.length < width)
    return padding.repeat(width - this.length) + this;
  else
    return this.toString();
};

// A monkey-patched convenience method to compute the maximum of two
// numbers.
Number.prototype.max = function(other) {
  let _this = this.valueOf();
  if (typeof other !== `number`) throw new Error(`unexpected parameter`);
  else return (_this >= other && _this) || other;
}

// A monkey-patched method to compute the gray code of an integer.
// The gray code has properties that make it helpful to the tournament problem.
Number.prototype.gray_code = function() {
  let _this = this.valueOf();
  if (!Number.isInteger(_this)) throw new Error(`unexpected number`);
  else return _this ^ (_this >> 1);
}

// A tournament is really a node in a binary tree.  The value in each
// node contains the ranking of the best ranking team contained in the
// tournament tree below.
class Tournament {

  constructor(ranking) {
    this.ranking = ranking;
  }

  // Creates a tournament with the given number of teams.
  static create(teams) {
    // create the initial node
    let head_node = new Tournament(1);

    // insert additional nodes for each further team
    for (let ranking = 2; ranking <= teams; ranking++) {
      head_node.add_team(ranking);
    }

    return head_node;
  }

  // Adds a team with the given ranking to the tournament.  It turns out
  // that the gray code of the ranking-1 has a bit pattern that conveniently
  // helps us descend the binary tree to the appropriate place at which to
  // put the team.
  add_team(ranking) {
    return this._add_team_help(ranking, (ranking - 1).gray_code());
  }

  // Returns the number of rounds in the tournament.  This is determined by
  // taking the max of the depths of the two sub-trees and adding one.
  rounds() {
    if (this.left === undefined)  return 0;
    else                          return 1 + (this.left.rounds().max(this.right.rounds()));
  }

  // Returns the pairs playing at a given round.  A round number of 1 is
  // the first round played and therefore the bottom-most layer of the tree.
  round(level) {
    return this._round_help(this.rounds() - level);
  }
  
  // Converts the tournament tree into a String representation.
  to_s() {
    let lines = []; // store the result as an array of lines initially
    
    // create the lowest layer of the tree representing the first round
    for (let game in this.round(1)) {
      lines.push(game[0].toString().rjust(3));
      lines.push(`---`);
      lines.push(`   `);
      lines.push(`---`);
      lines.push(game[1].toString().rjust(3));
      lines.push(`   `);
    }
    lines.pop(); // last line, which just contains blanks, is not needed
    
    // the rest of the text tree is made through textual operations
    // by connecting teams playing with veritcal lines, then branching
    // horizontally to the next level, and then extending those branches
    let counter;
    do {
      counter = this._to_s_connect(lines);
      this._to_s_branch(lines);
      for(let i = 0; i < 3; i++) this._to_s_extend(lines);
    } while(counter === 1);
    
    return /*this._header_string() +*/ lines.join("\n");
  }

  /* * * private * * */

  // Recursively descends the tree to place a team with a new ranking.
  // Ultimately it will create two new nodes and insert them into the
  // tree representing itself and the team to be played.  When
  // descending the three, the bits in the gray code of the ranking
  // from least-significant to most-significant indicate which branch
  // to take.
  _add_team_help(ranking, gray_code) {
    if (this.left === undefined) {
      // bottomed out; create two new nodes
      this.left = new Tournament(this.ranking);
      this.right = new Tournament(ranking);
    } 
    else if (gray_code % 2 == 0)
      // bit in gray code indicates the left branch
      this.left._add_team_help(ranking, gray_code >> 1);
    else
      // bit in gray code indicates the right branch
      this.right._add_team_help(ranking, gray_code >> 1);
  }

  // Returns the teams playing at the given round level.  The parameter
  // is actually the desired round subtracted from the number of
  // rounds.  That way we know we're at the right level when it reaches
  // zero.  It can be the case where a given branch does not have
  // enough levels; that indicates a "bye" for a good-ranking team.
  _round_help(reverse_level) {
    if (this.left === undefined) 
      return [[this.ranking, `bye`]];
    else if (reverse_level === 0) 
      return [[this.left.ranking, this.right.ranking]];
    else 
      return  this.left._round_help(reverse_level - 1) +
              this.right._round_help(reverse_level - 1);
  }
  
  _to_s_connect(lines) {
    let count   = 0,
        connect = false;
    for (let line in lines) {
      if (line[-1] === `-`){
        line.push(`+`);
        connect = !connect;
        if (connect) count++;
      }
      else if (connect) line.push(`|`);
      else              line.push(` `);
    }
  }
  
  // From the vertical lines used to represent a game, this places a
  // horizontal line in the *middle* of it which indicates the winning
  // team.  Except for the final round, these horizontal lines will be
  // used to create a game at the next round.
  _to_s_branch(lines) {
    let range_began = false;
    lines.forEach((v,i) => {
      if(lines[i][-1] === `|` && range_began === false)
        range_began = i;
      else if (range_began !== false) {
        lines[(i + range_began - 1)/2][-1] = "+";
        range_began = false;
      }
    });
  }
  
  // Extends the horizontal lines by one character.
  _to_s_extend(lines) {
    for (let line in lines) {
      if (line.match(/(-| \+)$/))
        line.push(`-`);
      else
        line.push(` `);
    }
  }
}
