
Number.prototype.max = function(other) {
  if(typeof other !== `number`) throw new Error(`unexpected parameter`);
  else return (this >= other && this.valueOf()) || other;
}

Number.prototype.toGrayCode = function() {
  let _this = this.valueOf();
  if(!Number.isInteger(_this)) throw new Error();
  else return _this ^ (_this >> 1);
}
