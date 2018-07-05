var idAnimation;
var keyControl;
var game;
var idAnimation;
var gamepad;
var ctx;
var introImage;
var timeStamp = Date.now();
var blink = false;
var state = 'intro'; // valid intro, credits, game
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

  loop();
};

function loop() {

  requestAnimationFrame(loop.bind(this)); //sustituye los setinterval y presenta 60frm/sec
  //console.log(this.game.state);
  switch (state) {
    case 'game':
      cabinet(true);
      logo(false);
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
      introMusic.play();
      cabinet(false);
      logo(false);
      intro();
      break;
    case 'credits':
      cabinet(false);
      logo(true);
      $('img.logo').show();
      credits();
      break;
  }
}

function logo(action) {
  if (action) {
    $('img.logo').show();
  } else {
    $('img.logo').hide();
  }
}

function cabinet(action) {
  if (action) {
    $('img.cabinet-top').show();
    $('img.cabinet-sides').show();
    $('img.cabinet-bottom').show();
  } else {
    $('img.cabinet-top').hide();
    $('img.cabinet-sides').hide();
    $('img.cabinet-bottom').hide();
  }
}

function intro() {

  ctx.fillStyle = 'white';
  ctx.drawImage(introImage, sky.width / 2 - introImage.width / 2, sky.height / 4 - introImage.height / 2.5);

  blinkText('press SPACE to continue');

  if (keyControl.keysBuffer.Space) {
    keyControl.keysBuffer.Space = false; //control if pressed multiple key 
    state = 'game';
    this.game.state = 'play';

    return true;
    //TODO: sound.stop();
  }
  return false;
}

function win() {

  game.nextLevel();

  centerText('LEVEL ' + game.level);
  blinkText('press SPACE to continue');

  if (keyControl.keysBuffer.Space) {
    keyControl.keysBuffer.Space = false; //control if pressed multiple key 
    game.state = 'play';
    return true;
  }
}

function pause() {

  centerText('GAME PAUSED');
  blinkText('press SPACE to continue');

  if (keyControl.keysBuffer.Space) {
    keyControl.keysBuffer.Space = false; //control if pressed multiple key 
    game.state = 'play';
    return true;
  }
}

function end() {

  centerText('GAME OVER');
  blinkText('press SPACE to continue');

  if (keyControl.keysBuffer.Space) {
    keyControl.keysBuffer.Space = false; //control if pressed multiple key 
    putInRanking(prompt('write your name:'), game.totalPoints);
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

  ctx.fillText('BEST PLAYERS', sky.width / 6 + 30, sky.height / 6 + 30);

  fillRanking();

  for (var index = 0; index < localStorage.length / 2; index++) {
    element1 = localStorage.getItem('name' + index);
    element2 = localStorage.getItem('points' + index);
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
    keyControl.keysBuffer.Space = false; //control if pressed multiple key 
    ctx.clearRect(0, 0, sky.width, sky.height);
    this.game.state = 'stop';
    state = 'intro';
    return true;
  }
  return false;
}

function putInRanking(name, points) {
  tempPoints = 0;
  write = true;

  for (var index = 0; index < localStorage.length / 2 && write; index++) { //10 is maxim rows in ranking 
    tempPoints = localStorage.getItem("points" + index);
    if (tempPoints < points) {
      localStorage.setItem("name" + index, name);
      localStorage.setItem("points" + index, game.totalPoints);
      write = !write;
    }
  }
}

function blinkText(text) {

  ctx.font = " 30px Avenir";
  if (Date.now() - timeStamp > 1000 / 2) {
    timeStamp = Date.now();
    ctx.fillStyle = blink ? 'white' : 'yellow';
    ctx.fillText(text, sky.width / 2 - text.length / 2 * 15, sky.height / 2 + 220);
    blink = !blink;
  }
}

function centerText(text) {

  ctx.fillStyle = 'white';
  ctx.font = " 80px Avenir";
  ctx.fillText(text, sky.width / 2 - text.length / 2 * 50, sky.height / 2 - 20);
}

function fillRanking() {
  if (localStorage.length === 0 || (localStorage.length > 0 && localStorage.getItem('name0') === null)) {
    // if not ranking, fill it
    localStorage.clear();
    localStorage.setItem('name0', 'Júlia');
    localStorage.setItem('name1', 'Irene');
    localStorage.setItem('name2', 'Alexia');
    localStorage.setItem('name3', 'Cecilia');
    localStorage.setItem('name4', 'Diana');
    localStorage.setItem('name5', 'Joel');
    localStorage.setItem('name6', 'Andrés');
    localStorage.setItem('name7', 'Marisol');
    localStorage.setItem('name8', 'Santiago');
    localStorage.setItem('name9', 'Sofía');
    localStorage.setItem('points0', '17292');
    localStorage.setItem('points1', '14543');
    localStorage.setItem('points2', '7249');
    localStorage.setItem('points3', '880');
    localStorage.setItem('points4', '634');
    localStorage.setItem('points5', '634');
    localStorage.setItem('points6', '634');
    localStorage.setItem('points7', '634');
    localStorage.setItem('points8', '634');
    localStorage.setItem('points9', '634');
  }
}