function KeyControl() {
  this.keysBuffer = []; //buffer of keys pressed. Global
}

KeyControl.prototype.init = function () {
  this._assignEventsToKeys();
};

KeyControl.prototype._assignEventsToKeys = function () {
  window.addEventListener('keydown', function (e) {
    this.keysBuffer[e.code] = true;
    console.log(e.code);
  }.bind(this));
  window.addEventListener('keyup', function (e) {
    this.keysBuffer[e.code] = false;
    console.log(e.code);
  }.bind(this));
};