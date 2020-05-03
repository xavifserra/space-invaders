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
  gameIntroImage: 'assets/img/IntroSI40anniversary_transp.png',
  gameIntroMusic: 'assets/sounds/duel of fates.mp3',
  // SQUAD
  enemiesInRow: 5, // always 5
  enemiesInColumn: 12, // can select quantity of columns
  enemiesVelocity: 3,
  spaceBetweenEnemies: 40,
  // Timer Boss Appearance
  timerBetweenBossAppearance() { return Math.random() * (1 - 0.5) + 0.5 }, // random min 15s max 30s in timer 30000
}

// Weapons
const weapons = {
  // Projectiles
  missile: {
    width: 24,
    height: 48,
    color: 'green',
    ratio: 2, // ratio missile equal to 3fps
    velocity: 10,
    image: 'assets/img/bullets.png',
  },
  bomb: {
    // bomb
    width: 20,
    height: 20,
    color: 'yellow',
    ratio: 6,
    timer: 6,
    velocity: 3,
    points: 5,
    image: 'assets/img/bomb.png',
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
  boss: {
    // BOSS
    width: 63,
    height: 40,
    color: '#0000FF',
    points() {
      return Math.floor(Math.random() * 250)
    },
    image: 'assets/img/bomb1.png', // 'assets/img/boss.png',
  },
  official: {
    // enemy Level3
    width: 25,
    height: 25,
    color: '#3366CC',
    points: 50,
    image: 'assets/img/enemyOfficial.png',
  },
  veteran: {
    // enemy Level2
    width: 25,
    height: 25,
    color: '#FF00FF',
    points: 25,
    image: 'assets/img/enemyVeteran.png',
  },
  rookie: {
    // enemy Level1
    width: 25,
    height: 25,
    color: '#33CC33',
    points: 15,
    image: 'assets/img/enemyRookie.png',
  },
}
