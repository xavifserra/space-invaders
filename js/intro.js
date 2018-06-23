function Intro() {

}

Intro.prototype.init = function () {
  this._loop();
};
Intro.prototype.end = function () {
  return true;
};
Intro.prototype._loop = function () {
  window.requestAnimationFrame(this._loop.bind(this)); //sustituye al setinterval y presenta 60frm/sec
  
  if (setup.keysBuffer.Space || setup.keysBuffer.Enter) { //space or enter
    this.end();
  }
};
