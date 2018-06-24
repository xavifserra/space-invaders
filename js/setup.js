var setup = {
 //GAME
  // keysBuffer: [], //buffer of keys pressed. Global
  //bombBuffer: [], //buffer of bombs launched. Global
  //missileBuffer: [], //buffer of missiles launched. Global
  limitWidth: 800, //window.innerWidth,
  limitHeight: 600, //window.innerHeight,
  boardColor: 'black', //'#E3D4AB'
  fps: 35, //frames per second in game
  stateOfGame:'intro',
  //player
  playerColor: 'red',
  playerWidth: 20,
  playerHeiht: 20,
  playerPosX:function(){return setup.limitWidth / 2 ;}, 
  playerPosY: function (){return setup.limitHeight - 50; },
  playerImage:'assets/images/ship.png',
  //enemy 
  enemyWidth: 20,
  enemyHeiht: 20,
  enemySpace: 30,
  enemyVelocity: 3,
  //enemy Level3
  enemyL3Color: '#3366CC',
  enemyL3Points: 50,
  //enemy Level2
  enemyL2Color: '#FF00FF',
  enemyL2Points: 25,
  //enemy Level1
  enemyL1Color: '#33CC33',
  enemyL1Points: 15,
  //BOSS
  enemyBossColor: '#0000FF',
  enemyBossTimer: function () { return Math.random() * (1 - 0.5) + 0.5; }, //random min 15s max 30s in timer 30000
  enemyBossPoints: function () { return Math.floor(Math.random() * 250); },
  //SQUAD
  enemiesInRow: 5,
  enemiesInColumn: 11,
  //Projectiles
  missileColor: 'green',
  missileWidth: 3,
  misileHeiht: 10,
  missileMax: 3, //ratio missile equal to 3fps
  missileVelocity: 5,
  //bomb
  bombColor: 'yellow',
  bombWidth: 10,
  bombHeiht: 10,
  bombMax: 6,
  bombTimer: 6,
  bombVelocity: 3,
  //SOUNDS
  soundsOfGame: {
    shoot: 'assets/sounds/shoot.mp3',
    explosion: 'assets/sounds/explosion.mp3',
    enemyKilled:'assets/sounds/invaderkilled.mp3',
  },
  imagesOfGame: [],
};