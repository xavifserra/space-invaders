var gamepadAPI = {
  controller: {},
  turbo: false,
  connect: function (evt) {
    gamepadAPI.controller = evt.gamepad;
    gamepadAPI.turbo = true;
    console.log('Gamepad connected.');
  },
  disconnect: function (evt) {
    gamepadAPI.turbo = false;
    delete gamepadAPI.controller;
    console.log('Gamepad disconnected.');
  },
  update: function () {
    // clear the buttons cache
    gamepadAPI.buttonsCache = [];
    // move the buttons status from the previous frame to the cache
    for (var k = 0; k < gamepadAPI.buttonsStatus.length; k++) {
      gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
    }
    // clear the buttons status
    gamepadAPI.buttonsStatus = [];
    // get the gamepad object
    var c = gamepadAPI.controller || {};

    // loop through buttons and push the pressed ones to the array
    var pressed = [];
    if (c.buttons) {
      for (var b = 0, t = c.buttons.length; b < t; b++) {
        if (c.buttons[b].pressed) {
          pressed.push(gamepadAPI.buttons[b]);
        }
      }
    }
    // loop through axes and push their values to the array
    var axes = [];
    if (c.axes) {
      for (var a = 0, x = c.axes.length; a < x; a++) {
        axes.push(c.axes[a].toFixed(2));
      }
    }
    // assign received values
    gamepadAPI.axesStatus = axes;
    gamepadAPI.buttonsStatus = pressed;
    // return buttons for debugging purposes
    return pressed;
  },
  buttonPressed: function(button, hold) {
    var newPress = false;
    // loop through pressed buttons
    for(var i=0,s=gamepadAPI.buttonsStatus.length; i<s; i++) {
      // if we found the button we're looking for...
      if(gamepadAPI.buttonsStatus[i] == button) {
        // set the boolean variable to true
        newPress = true;
        // if we want to check the single press
        if(!hold) {
          // loop through the cached states from the previous frame
          for(var j=0,p=gamepadAPI.buttonsCache.length; j<p; j++) {
            // if the button was already pressed, ignore new press
            if(gamepadAPI.buttonsCache[j] == button) {
              newPress = false;
            }
          }
        }
      }
    }
    return newPress;
  },
  buttons: [],
  buttonsCache: [],
  buttonsStatus: [],
  axesStatus: []
};



function TestGamePad() {
  this.pad = undefined;
}

TestGamePad.prototype.test = function (keyControl) {
  this.pad = keyControl.controller;

  if (this.pad) {
    this.pad.buttons.forEach(function (button, index) {
      if (button.value == 1.0) {
        console.log(index + ':' + button.pressed + ' value: ' + button.value);
      }
      console.log(index + ':' + button.pressed + ' value: ' + button.value);
    }.bind(this));
  }
};