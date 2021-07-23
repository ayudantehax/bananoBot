
Number.prototype.max = function(other) {
  let _this = this.valueOf();
  if(typeof other !== `number`) throw new Error(`unexpected parameter`);
  else return (_this >= other && _this) || other;
}

Number.prototype.toGrayCode = function() {
  let _this = this.valueOf();
  if(!Number.isInteger(_this)) throw new Error();
  else return _this ^ (_this >> 1);
}
