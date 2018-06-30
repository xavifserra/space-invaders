var setup = {
  //GAME
  limitWidth: 800, //window.innerWidth,
  limitHeight: 600, //window.innerHeight,
  boardColor: 'black', //'#E3D4AB'
  fps: 20, //frames per second in game
  fpsSprite: 25,
  stateOfGame: 'intro',
  imagePause: '',
  
  //player
  playerColor: 'red',
  playerWidth: 40,
  playerHeiht: 40,
  playerPosX: function () {
    return setup.limitWidth / 2;
  },
  playerPosY: function () {
    return setup.limitHeight - 50;
  },
  playerImage: 'assets/img/ship.png',
  //enemy 
  enemyWidth: 25,
  enemyHeiht: 25,
  enemySpace: 40,
  enemyVelocity: 3,
  //enemy Level3
  enemyL3Color: '#3366CC',
  enemyL3Points: 50,
  enemyL3Image: 'assets/img/enemyOfficial.png',
  //enemy Level2
  enemyL2Color: '#FF00FF',
  enemyL2Points: 25,
  enemyL2Image: 'assets/img/enemyVeteran.png',
  //enemy Level1
  enemyL1Color: '#33CC33',
  enemyL1Points: 15,
  enemyL1Image: 'assets/img/enemyrookie.png',//'assets/img/enemyRookie.png',
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
  enemyBossImage: 'assets/img/boss.png',
  //SQUAD
  enemiesInRow: 5,
  enemiesInColumn: 11,
  //Projectiles
  missileColor: 'green',
  missileWidth: 24,
  misileHeiht: 48,
  missileMax: 2, //ratio missile equal to 3fps
  missileVelocity: 10,
  missileImage: 'assets/img/bullets.png',
  //bomb
  bombColor: 'yellow',
  bombWidth: 20,
  bombHeiht: 20,
  bombMax: 6,
  bombTimer: 6,
  bombVelocity: 3,
  bombPoints: 5,
  bombImage: 'assets/img/bomb.png',
  //explosions 
  explosionWidth: 45,
  explosionHeight: 45,
  explosionImage: 'assets/img/explosionbig.png',
  explosion1Width: 45,
  explosion1Height: 45,
  explosion1Image: 'assets/img/explosion-128x128x7.png',
  imagesOfGame: [],
};
//SOUNDS
var sounds = {
  soundShoot: 'assets/sounds/shoot.mp3',
  soundExplosion: 'assets/sounds/explosion.mp3',
  soundEnemyKilled: 'assets/sounds/invaderkilled.mp3',
  soundBoss: 'assets/sounds/ufo_lowpitch.mp3',
  soundHit: 'assets/sounds/Blaster Hit.mp3'
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
];

var weapons = [{
    name: 'missile'
  },
  {
    name: 'bomb'
  },

];