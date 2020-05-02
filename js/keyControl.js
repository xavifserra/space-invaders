function KeyControl() {
  this.keysBuffer = [] // buffer of keys pressed.
  this.controller = undefined
  this.keyCode = undefined
}

KeyControl.prototype.init = function () {
  this._assignEventsToKeys()
}

KeyControl.prototype._assignEventsToKeys = function () {
  window.addEventListener('keydown', (e) => {
    this.keysBuffer[e.code] = true
    this.keyCode = e.code
  })

  window.addEventListener('keyup', (e) => {
    this.keysBuffer[e.code] = false
  })

  // control GAMEPAD PS3
  window.addEventListener('gamepadconnected', (e) => {
    console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.', e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length)
    this.controller = e.gamepad
  })

  window.addEventListener('gamepaddisconnected', (e) => {
    console.log('Gamepad disconnected from index %d: %s',
      e.gamepad.index, e.gamepad.id)
    this.controller = undefined
  })

  // window.addEventListener("gamepadconnected", gamepadAPI.connect);
  // window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect);
}
