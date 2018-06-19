var setup = {
  keysBuffer: [],    //buffer of keys pressed. Global
  bombBuffer: [],      //buffer of bombs launched. Global
  missileBuffer: [],   //buffer of missiles launched. Global
  columnsOfEnemies: 11,
  rowsOfEnemies: 5,
  limitWidth: 800 ,    //window.innerWidth,
  limitHeight: 600 ,   //window.innerHeight,
  boardColor: 'black',  //'#E3D4AB'
  playerColor: 'red',
  enemyL3Color: '#3366CC',
  enemyL3Points: 50,
  enemyL2Color: '#FF00FF',
  enemyL2Points: 25,
  enemyL1Color: '#33CC33',
  enemyL1Points: 15,
  enemyBossColor: '#0000FF',
  enemyBossTimer: function(){return Math.random()* (1 - 0.5) + 0.5;}, //random min 15s max 30s in timer 30000
  enemyBossPoints: function () {return Math.floor(Math.random() * 250);},
  missileMax: 2,  //ratio missile equal to 2fps
  bombMax: 6,
  fps: 35,         //frames per second in game
  bombColor: 'red',
  missileColor: 'green',
  

};