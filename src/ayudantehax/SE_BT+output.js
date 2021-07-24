
String.prototype.rjust = function ( string, width, padding ) {
	padding = padding || " ";
	padding = padding.substr( 0, 1 );
	if ( string.length < width )
		return padding.repeat( width - string.length ) + string;
	else
		return string;
}

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
  
  to_s() {
    let lines = [];
    for (let game in this.round(1)) {
    }
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
      c bottomed out; create two new nodes
      this.left   = new Tournament(this.ranking);
      this.right  = new Tournament(ranking);
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
    if      (this.left === undefined) return [[this.ranking, `bye`]];
    else if (reverse_level === 0)     return [[this.left.ranking, this.right.ranking]];
    else                              return  this.left._round_help(reverse_level - 1) +
                                              this.right._round_help(reverse_level - 1)
  }
}

