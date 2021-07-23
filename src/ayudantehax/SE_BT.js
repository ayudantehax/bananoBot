
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
    return this.add_team_help(ranking, (ranking - 1).gray_code());
  }
  
  // Recursively descends the tree to place a team with a new ranking.
  // Ultimately it will create two new nodes and insert them into the
  // tree representing itself and the team to be played.  When
  // descending the three, the bits in the gray code of the ranking
  // from least-significant to most-significant indicate which branch
  // to take.
  add_team_help(ranking, gray_code) {
    if (this.left === undefined) {
      // bottomed out; create two new nodes
      this.left   = new Tournament(this.ranking);
      this.right  = new Tournament(ranking);
    }
    else if (gray_code % 2 == 0)
      // bit in gray code indicates the left branch
      this.left.add_team_help(ranking, gray_code >> 1);
    else
      // bit in gray code indicates the right branch
      this.right.add_team_help(ranking, gray_code >> 1);
  }
}
