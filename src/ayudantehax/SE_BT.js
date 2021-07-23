Number.prototype.gray_code = function() {
  let _this = this.valueOf();
  if (!Number.isInteger(_this)) throw new Error(`unexpected number`);
  else return _this ^ (_this >> 1);
}

class Tournament {
  constructor(ranking) {
    this.ranking = ranking;
  }
  
  static create(teams) {
    let head_node = new Tournament(1);
    for (let ranking = 2; ranking <= teams; ranking++) {
      head_node.add_team(ranking);
    }
    return head_node;
  }
  
  add_team(ranking) {
    return this.add_team_help(ranking, (ranking - 1).gray_code());
  }
  
  add_team_help(ranking, gray_code) {
    if (this.left === undefined) {
      this.left   = new Tournament(this.ranking);
      this.right  = new Tournament(ranking);
    }
    else if (gray_code % 2 == 0)  this.left.add_team_help(ranking, gray_code >> 1);
    else                          this.right.add_team_help(ranking, gray_code >> 1);
  }
}
