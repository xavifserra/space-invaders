var setup = {
 //GAME
  keysBuffer: [], //buffer of keys pressed. Global
  bombBuffer: [], //buffer of bombs launched. Global
  missileBuffer: [], //buffer of missiles launched. Global
  limitWidth: 800, //window.innerWidth,
  limitHeight: 600, //window.innerHeight,
  boardColor: 'black', //'#E3D4AB'
  fps: 35, //frames per second in game
  velocityEnemy: 3,
  velocityMissile: 5,
  velocityBomb: 4,
  missileMax: 3, //ratio missile equal to 3fps
  bombMax: 6,
  //player
  xPlayerPos:function(){return setup.limitWidth / 2 ;}, 
  yPlayerPos: function (){return setup.limitHeight - 50; },
  playerColor: 'red',
  playerWidth: 20,
  playerHeiht: 20,
  //enemy 
  enemyWidth: 20,
  enemyHeiht: 20,
  enemySpace: 30,
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
  columnsOfEnemies: 11,
  rowsOfEnemies: 5,
  //Projectiles
  missileColor: 'green',
  bombColor: 'red',

};

var players = [{
  name: player1,
  playerColor: 'red',
  playerWidth: 20,
  playerHeiht: 20,
}, ];