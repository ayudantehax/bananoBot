
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
    this.left = null;
    this.right = null;
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
    return this.add_team_help(ranking, (ranking - 1).gray_code);
  }
  
  rounds() {
    if (this.left === null) return 0;
    else                    return 1 + (this.left.rounds().max(this.right.rounds()));
  }
  
  round(level){
    return this.round_help(this.rounds() - level);
  }
  
  add_team_help(ranking, gray_code) {
    if (this.left === null) {
      this.left   = new Tournament(this.ranking);
      this.right  = new Tournament(ranking);
    }
    else if (gray_code % 2 === 0) this.left.add_team_help(ranking, gray_code >> 1);
    else                          this.right.add_team_help(ranking, gray_code >> 1);
  }
  
  round_help(reverse_level){
    if      (this.left === null)  return [[this.ranking, `bye`]];
    else if (reverse_level === 0) return [[this.left.ranking, this.right.ranking]];
    else                          return this.left.round_help(reverse_level - 1) + this.right.round_help(reverse_level - 1)
  }
}
