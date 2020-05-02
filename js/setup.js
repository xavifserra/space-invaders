const setup = {
  // GAME
  limitWidth: 800, // window.innerWidth,
  limitHeight: 600, // window.innerHeight,
  boardColor: 'black', // '#E3D4AB'
  fps: 20, // frames per second in game
  fpsSprite: 25,
  offSetSprite: 5,
  stateOfGame: 'intro',
  lives: 3,
  gameImageOfBackground: 'assets/img/background.png',
  gameIntroImage:'assets/img/IntroSI40anniversary_transp.png',
  gameIntroMusic: 'assets/sounds/duel of fates.mp3',
  // SQUAD
  enemiesInRow: 5, // always 5
  enemiesInColumn: 12, // can select quantity of columns
  timerPresentBoss() { return Math.random() * (1 - 0.5) + 0.5 }, // random min 15s max 30s in timer 30000
}

// Weapons
const weapons = {
  // Projectiles
  projectil: {
    missileColor: 'green',
    missileWidth: 24,
    misileHeiht: 48,
    missileMax: 2, // ratio missile equal to 3fps
    missileVelocity: 10,
    missileImage: 'assets/img/bullets.png',
  },
  bomb: {
  // bomb
    bombColor: 'yellow',
    bombWidth: 20,
    bombHeiht: 20,
    bombMax: 6,
    bombTimer: 6,
    bombVelocity: 3,
    bombPoints: 5,
    bombImage: 'assets/img/bomb.png',
  },
}

// SOUNDS
const sounds = {
  shoot: 'assets/sounds/shoot.mp3',
  explosion: 'assets/sounds/explosion.mp3',
  enemyKilled: 'assets/sounds/invaderkilled.mp3',
  boss: 'assets/sounds/ufo_lowpitch.mp3',
  bossExplode: 'assets/sounds/explosion.mp3',
  hit: 'assets/sounds/Blaster Hit.mp3',
}

// explosions
const explosions = {
  type1: {
    rows: 1,
    cols: 24,
    frames: 24,
    width: 3120,
    height: 130,
    image: 'assets/img/explosion-3120x130x24.png',
  },
  type2: {
    rows: 1,
    cols: 10,
    frames: 10,
    width: 1280,
    height: 128,
    image: 'assets/img/explosion-1280x128x10.png',
  },
  type3: {
    rows: 1,
    cols: 9,
    frames: 9,
    width: 648,
    height: 72,
    image: 'assets/img/explosion-648x72x9.png',
  },
}

// LIVE
const liveScore = {
  rows: 4,
  cols: 1,
  frames: 4,
  width: 120,
  height: 144,
  image: 'assets/img/lives-120x144x4.png',
}
// actors
player1 = {
  // player
  playerColor: 'red',
  playerWidth: 40,
  playerHeiht: 40,
  playerPosX() { return setup.limitWidth / 2 },
  playerPosY() { return setup.limitHeight - 50 },
  playerImage: 'assets/img/ship.png',
}

const enemies = {
  boss : {
    // BOSS
    enemyBossWidth: 63,
    enemyBossHeiht: 40,
    enemyBossColor: '#0000FF',
    enemyBossPoints() { return Math.floor(Math.random() * 250) },
    enemyBossImage: 'assets/img/bomb1.png', // 'assets/img/boss.png',
  },
  official :{},
  veteran :{},
  rookie : {},
}
