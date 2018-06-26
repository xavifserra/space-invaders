var setup = {
  //GAME
  limitWidth: 800, //window.innerWidth,
  limitHeight: 600, //window.innerHeight,
  boardColor: 'black', //'#E3D4AB'
  fps: 35, //frames per second in game
  stateOfGame: 'intro',
  //player
  playerColor: 'red',
  playerWidth: 40,
  playerHeiht: 43,
  playerPosX: function () {
    return setup.limitWidth / 2;
  },
  playerPosY: function () {
    return setup.limitHeight - 50;
  },
  playerImage: 'assets/images/ship.png',
  //enemy 
  enemyWidth: 20,
  enemyHeiht: 23,
  enemySpace: 40,
  enemyVelocity: 3,
  //enemy Level3
  enemyL3Color: '#3366CC',
  enemyL3Points: 50,
  enemyL3Image: 'assets/images/ship.png',
  //enemy Level2
  enemyL2Color: '#FF00FF',
  enemyL2Points: 25,
  enemyL2Image: 'assets/images/ship.png',
  //enemy Level1
  enemyL1Color: '#33CC33',
  enemyL1Points: 15,
  enemyL1Image: 'assets/images/ship.png',
  //BOSS
  enemyBossWidth: 63,
  enemyBossHeiht: 40,
  enemyBossColor: '#0000FF',
  enemyBossTimer: function () {
    return Math.random() * (1 - 0.5) + 0.5;
  }, //random min 15s max 30s in timer 30000
  enemyBossPoints: function () {
    return Math.floor(Math.random() * 250);
  },
  enemyBossImage: 'assets/images/boss.png',
  //SQUAD
  enemiesInRow: 5,
  enemiesInColumn: 11,
  //Projectiles
  missileColor: 'green',
  missileWidth: 8,
  misileHeiht: 24,
  missileMax: 2, //ratio missile equal to 3fps
  missileVelocity: 5,
  missileImage: 'assets/images/blaster.png',
  //bomb
  bombColor: 'yellow',
  bombWidth: 10,
  bombHeiht: 10,
  bombMax: 6,
  bombTimer: 6,
  bombVelocity: 3,
  bombPoints: 5,
  //SOUNDS
  soundsOfGame: {
    soundShoot: 'assets/sounds/shoot.mp3',
    soundExplosion: 'assets/sounds/explosion.mp3',
    soundEnemyKilled: 'assets/sounds/invaderkilled.mp3',
    soundBoss:'assets/sounds/ufo_lowpitch.mp3',
  },
  imagesOfGame: [],
};

var actors = [{
    name: 'player'
  },
  {
    name: 'boss'
  },
  {
    name: 'official'
  },
  {
    name: 'veteran'
  },
  {
    name: 'rookie'
  },
  {
    name: 'missile'
  },
  {
    name: 'bomb'
  },

];