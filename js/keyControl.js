function KeyControl() {
  this.keysBuffer = []; //buffer of keys pressed. 
  this.controller = undefined;
  this.keyCode = undefined;
}

KeyControl.prototype.init = function () {
  this._assignEventsToKeys();
};

KeyControl.prototype._assignEventsToKeys = function () {

  window.addEventListener('keydown', function (e) {
    this.keysBuffer[e.code] = true;
    this.keyCode = e.code;
    console.log(e.code);
  }.bind(this));

  window.addEventListener('keyup', function (e) {
    this.keysBuffer[e.code] = false;
    console.log(e.code);
  }.bind(this));

  //control GAMEPAD PS3
  window.addEventListener("gamepadconnected", function (e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
      this.controller=e.gamepad;
  }.bind(this));

  window.addEventListener("gamepaddisconnected", function (e) {
    console.log("Gamepad disconnected from index %d: %s",
      e.gamepad.index, e.gamepad.id);
      this.controller=undefined;
  }.bind(this));

  // window.addEventListener("gamepadconnected", gamepadAPI.connect);
  // window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect);
};