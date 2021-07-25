
function calculateRounds(teams, _n = 1){
    if (teams <= Math.pow(2, _n)) return _n;
    return calculateRounds(teams, _n + 1);
}

Number.prototype.gray_code = function() {
  let _this = this.valueOf();
  if (!Number.isInteger(_this)) throw new Error(`unexpected number`);
  else return _this ^ (_this >> 1);
}

class Tournament {
  
  constructor(ranking, round = 0) {
    this.ranking  = ranking;
    
    if (round > 0) {
      this.data = {};
      if (round > 0)
        this.data.round = round;
    }
  }
  
  static create(teams) {
    let head_node = new Tournament(1, calculateRounds(teams));
    
    for (let ranking = 2; ranking <= teams; ranking++) {
      head_node.add_team(ranking);
    }
    
    return head_node;
  }
  
  add_team(ranking) {
    return this._add_team_help(ranking, (ranking - 1).gray_code());
  }
  
  /* * * private * * */
  
  _add_team_help(ranking, gray_code) {
    if (this.left === undefined) {
      this.left   = new Tournament(this.ranking,  this.data.round - 1 || undefined);
      this.right  = new Tournament(ranking,       this.data.round - 1 || undefined);
    }
    else if (gray_code % 2 == 0)
      this.left._add_team_help(ranking, gray_code >> 1);
    else
      this.right._add_team_help(ranking, gray_code >> 1);
  }
}
