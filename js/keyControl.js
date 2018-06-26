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
//control GAMEPAD
  window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
    //gamepadAPI.connect;
  }.bind(this));

  window.addEventListener("gamepaddisconnected", function(e) {
    console.log("Gamepad disconnected from index %d: %s",
      e.gamepad.index, e.gamepad.id);
      //gamepadAPI.disconnect;
  }.bind(this));
};