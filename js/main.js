window.onload = function () {
  var sky = document.getElementById('game-zone');
  var ctx = sky.getContext('2d');

  sky.width = setup.limitWidth;
  sky.height = setup.limitHeight;
  var keyControl = new KeyControl();
  //var stars= new Starts(ctx);
  //var intro = new Intro(ctx);
  var game = new Game(ctx, keyControl.keysBuffer);
  //var end = new End(ctx);
  keyControl.init();
  game.init();
};