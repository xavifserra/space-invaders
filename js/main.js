window.onload = function () {
  var sky = document.getElementById('game-zone');
  var ctx = sky.getContext('2d');

  sky.width = setup.limitWidth;
  sky.height = setup.limitHeight;

  var game = new Game({
    ctx: ctx,
    player: new Player(setup.limitWidth / 2, setup.limitHeight - 50),
  //  boss: new Enemy(setup.limitWidth - 10, 50, 'boss'),
    squad: new Squad(5, 11),
  //  score: new Score(),

  });

  game.init();

};