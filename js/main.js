var idAnimation;
var keyControl;
var game;
var idAnimation;
var gamepad;
var ctx;
var introImage;
var timeStamp = Date.now();
var blink = false;
var state = 'credits'; //'intro'; // valid intro, credits, game
var introMusic;

window.onload = function () {
  sky = document.getElementById('game-zone');
  ctx = sky.getContext('2d');

  sky.width = setup.limitWidth;
  sky.height = setup.limitHeight;
  keyControl = new KeyControl();
  keyControl.init();
  game = new Game(ctx, keyControl.keysBuffer);
  introImage = new Image();
  introImage.src = "assets/img/IntroSI40anniversary_transp.png";
  introMusic = new Sound("assets/sounds/duel of fates.mp3");
  // game.init();
  loop();
  //  gamepad = new TestGamePad();
};

function loop() {

  idAnimation = requestAnimationFrame(loop.bind(this)); //sustituye los setinterval y presenta 60frm/sec
  //gamepad.test(keyControl);
  console.log(this.game.state);
  switch (state) {
    case 'game':
      introMusic.play();
      switch (this.game.state) {
        case 'play':
          game.draw();
          break;
        case 'pause':
          pause();
          break;
        case 'win':
          win();
          break;
        case 'lost':
          end();
          break;
      }
      break;
    case 'intro':
      intro();
      break;
    case 'credits':
      credits();
      break;
  }
}

function intro() {

  ctx.fillStyle = 'white';
  ctx.drawImage(introImage, sky.width / 2 - introImage.width / 2, sky.height / 4 - introImage.height / 2.5);

  blinkText('press SPACE to continue');

  if (keyControl.keysBuffer.Space) {
    keyControl.keysBuffer.Space = false;
    state = 'game';
    this.game.state = 'play';

    return true;
    //TODO: sound.stop();
  }
  return false;
}

function pause() {
  ctx.fillStyle = 'white';
  ctx.font = " 80px Avenir";
  ctx.fillText('GAME PAUSED', sky.width / 2 - 280, sky.height / 2 - 20);

  blinkText('press SPACE to continue');

  if (keyControl.keysBuffer.Space) {
    game.state = 'play';
    return true;
  }
}

function end() {
  ctx.fillStyle = 'white';
  ctx.font = " 80px Avenir";
  ctx.fillText('GAME OVER', sky.width / 2 - 250, sky.height / 2 - 20);

  blinkText('press SPACE to continue');

  if (keyControl.keysBuffer.Space) {
    localStorage.setItem('name', prompt('write your name:'));
    localStorage.setItem('points', game.totalPoints);
    game.reset();
    game.state = 'stop';
    state = 'credits';
    return true;
  }
}

function credits() {
  ctx.fillStyle = 'white';
  ctx.font = "16px Avenir";
  ctx.fillRect(sky.width / 6, sky.height / 6, sky.width / 6 * 4, sky.height / 6 * 3.6);
  ctx.clearRect(sky.width / 6 + 2, sky.height / 6 + 2, sky.width / 6 * 4 - 3, sky.height / 6 * 3.6 - 3);
  //ctx.strokeRect(sky.width / 6, sky.height / 6, sky.width / 6 * 3.5, sky.height / 6 * 3.5);
  ctx.fillText('BEST PLAYERS', sky.width / 6 + 30, sky.height / 6 + 30);
  console.log(localStorage);

  for (var index = 0; index < localStorage.length / 2; index++) {
    element1 = localStorage.getItem('name' + index);
    element2 = localStorage.getItem('points' + index);
    console.log(element1);
    ctx.fillStyle = 'white';
    ctx.fillText('player: ', sky.width / 6 * 1.5, sky.height / 6 + 70 + index * 30);
    ctx.fillStyle = 'yellow';
    ctx.fillText(element1, sky.width / 6 * 2, sky.height / 6 + 70 + index * 30);
    ctx.fillStyle = 'white';
    ctx.fillText('Points: ', sky.width / 6 * 3, sky.height / 6 + 70 + index * 30);
    ctx.fillStyle = 'yellow';
    ctx.fillText(element2, sky.width / 6 * 3.5, sky.height / 6 + 70 + index * 30);
  }

  blinkText('press SPACE to continue');

  if (keyControl.keysBuffer.Space) {
    ctx.clearRect(0, 0, sky.width, sky.height);
    this.game.state = 'stop';
    state = 'intro';
    return true;
  }
  return false;
}

function blinkText(text) {

  ctx.font = " 30px Avenir";
  if (Date.now() - timeStamp > 1000 / 2) {
    timeStamp = Date.now();
    ctx.fillStyle = blink ? 'white' : 'yellow';
    ctx.fillText(text, sky.width / 2 - 170, sky.height / 2 + 220);
    blink = !blink;
  }
}