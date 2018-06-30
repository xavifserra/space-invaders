var idAnimation;
var keyControl;
var game;
var idAnimation;


window.onload = function () {
  sky = document.getElementById('game-zone');
  var ctx = sky.getContext('2d');
  
  sky.width = setup.limitWidth;
  sky.height = setup.limitHeight;
  keyControl = new KeyControl();
  game = new Game(ctx, keyControl.keysBuffer);
  keyControl.init();
  game.init();
  loop();
};
window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});
window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s",
    e.gamepad.index, e.gamepad.id);
});

function loop() {

  idAnimation = requestAnimationFrame(loop.bind(this)); //sustituye los setinterval y presenta 60frm/sec
  game.draw();
}