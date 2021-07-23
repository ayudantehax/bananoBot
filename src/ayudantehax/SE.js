
Number.prototype.max = function(other) {
  let _this = this.valueOf();
  if (typeof other !== `number`) throw new Error(`unexpected parameter`);
  else return (_this >= other && _this) || other;
}

Number.prototype.gray_code = function() {
  let _this = this.valueOf();
  if (!Number.isInteger(_this)) throw new Error(`unexpected number`);
  else return _this ^ (_this >> 1);
}

class Tournament {
  constructor(ranking) {
    this.ranking = ranking;
    this.create = function(teams){
      let head_node = new Tournament(1);
      for (let ranking = 2; ranking <= teams; ranking++) {
        head_node.add_team(ranking);
      }
      return head_node;
    }
  }
  
  add_team(ranking) {
    return add_team_help(ranking, (ranking - 1).gray_code);
  }
  
  rounds() {
  }
  
  round(level){
    return round_help(rounds() - level);
  }
  
  add_team_help(ranking, gray_code) {
  }
  
  round_help(reverse_level){
  }
}
