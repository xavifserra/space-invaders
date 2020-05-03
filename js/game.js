function Game(ctx, keysBuffer) {
  this.totalPoints = 0
  this.level = 1
  this.maxWidth = setup.limitWidth
  this.maxHeight = setup.limitHeight
  this.ctx = ctx
  this.keysBuffer = keysBuffer
  this.missileBuffer = []
  this.debug = true
  this.state = 'stop' // valid: 'play','stop','win','lost'
  this._offSetSprite = setup.offSetSprite

  // control of FPS
  this._timeStamp = Date.now()
  this._timeStampMissile = Date.now()
  this._timeStampBoss = Date.now()
  this._timestampSquad = Date.now()
  this.enemyBossTimer = setup.timerBetweenBossAppearance()

  // player & enemies
  this.boss = undefined
  this.player = new Player(player1)
  this.squad = new Squad(setup.enemiesInRow, setup.enemiesInColumn, setup.spaceBetweenEnemies)

  // lives
  this.livesOfPlayer = setup.lives
  this.livesCounter = new Sprite(liveScore.image, liveScore.rows, liveScore.cols, liveScore.width, liveScore.height, liveScore.frames)

  // sounds
  this.soundOfShoot = new Sound(sounds.shoot)
  this.soundOfExplosion = new Sound(sounds.explosion)
  this.soundOfEnemyKilled = new Sound(sounds.enemyKilled)
  this.soundOfBoss = new Sound(sounds.boss)
  this.soundOfBlasterHit = new Sound(sounds.hit)
  this.soundBossExplode = new Sound(sounds.bossExplode)

  this.background = new Image()
  this.background.src = setup.gameImageOfBackground
}

Game.prototype.manageBufferOfKeysPressed = function () {
  if (this.keysBuffer.KeyP) { // key P => Pause.
    this.state = 'stop'
  }
  if (this.keysBuffer.Space) { // space => fire
    this.playerFire()
  }
  if (this.keysBuffer.ArrowLeft) { // arrow left
    this.player.goLeft()
  }
  if (this.keysBuffer.ArrowRight) { // arrow right
    this.player.goRight()
  }
  if (this.keysBuffer.Space && this.keysBuffer.ArrowLeft) { // left+fire
    this.playerFire()
    this.player.goLeft()
  }
  if (this.keysBuffer.Space && this.keysBuffer.ArrowRight) { // right+fire
    this.playerFire()
    this.player.goRight()
  }
}

Game.prototype.nextLevel = function () {
  this.missileBuffer = []
  this.state = 'play' // valid: 'play','win','lost', 'stop'
  this.level++

  // control of FPS
  this._timeStamp = Date.now()
  this._timeStampMissile = Date.now()
  this._timeStampBoss = Date.now()

  // player & enemies
  this.boss = undefined
  this.player.state = 'combat'
  this.squad = new Squad(setup.enemiesInRow, setup.enemiesInColumn)
}

Game.prototype.reset = function () {
  this.missileBuffer = []
  this.totalPoints = 0
  this.level = 1
  this.livesOfPlayer = setup.lives

  // control of FPS
  this._timeStamp = Date.now()
  this._timeStampMissile = Date.now()
  this._timeStampBoss = Date.now()

  // player & enemies
  this.boss = undefined
  this.squad = new Squad(setup.enemiesInRow, setup.enemiesInColumn)

  this.state = 'stop' // valid: 'play','win','lost', 'stop'
  this.player.state = 'combat'
}

Game.prototype.drawSky = function () {
  // TODO: make stars in the sky
  this.ctx.clearRect(0, 0, this.maxWidth, this.maxHeight)
  this.ctx.drawImage(this.background, 0, 0, this.maxWidth, this.maxHeight)
  // this.ctx.fillStyle = setup.boardColor;
  // this.ctx.fillRect(0, 0, this.maxWidth, this.maxHeight);
}

Game.prototype.drawPlayer = function () {
  if (this.player.x < 1) {
    this.player.x = 1
  }
  if (this.player.x > this.maxWidth - this.player.width) {
    this.player.x = this.maxWidth - this.player.width
  }
  if (this.player.state != 'combat') {
    this.player.x = this.player.xOld // Don't move in pause or explosion
  }
  this.player.draw(this.ctx)
}

Game.prototype.playerFire = function () {
  if (Date.now() - this._timeStampMissile > (1000 / setup.missileMax)) {
    this._timeStampMissile = Date.now()
    this.missileBuffer.push(this.player.fire())
    this.soundOfShoot.play()
  }
}

Game.prototype.drawBoss = function () {
  if (this.boss) {
    this.boss.goLeft()
    this.boss.draw(this.ctx)
    // this.ctx.fillStyle = this.boss.color;
    // this.ctx.fillRect(this.boss.x, this.boss.y, this.boss.width, this.boss.height);
    this.soundOfBoss.play()
    if (this.boss.x < 0 || this.boss.state === 'destroy') { // out of area
      this.boss = undefined
    }
  }
}

Game.prototype.drawMissile = function () {
  if (this.missileBuffer.length > 0) {
    this.missileBuffer.forEach((missile, index) => {
      if (missile.y > 1 && missile.y < this.maxHeight) {
        missile.trajectory()
        missile.draw(this.ctx)
        // this.ctx.fillStyle = missile.color;
        // this.ctx.fillRect(missile.x, missile.y, missile.width, missile.height);
      } else {
        this.missileBuffer.splice(index, 1)
      }
    })
  }
}

Game.prototype.drawBomb = function () {
  if (this.squad.bombBuffer.length > 0) {
    this.squad.bombBuffer.forEach((bomb, index) => {
      if (bomb.y > 1 && bomb.y < this.maxHeight - 26) {
        bomb.trajectory()
        bomb.draw(this.ctx)
        // this.ctx.fillStyle = bomb.color;
        // this.ctx.fillRect(bomb.x, bomb.y, bomb.width, bomb.height);
      } else {
        this.squad.bombBuffer.splice(index, 1)
        this.squad.bombCounter--
      }
    })
  }
}

Game.prototype.drawSquad = function () {
  this.squad.enemiesCollection.forEach((row, indexRow) => {
    row.forEach((enemy, indexEnemy) => {
      if (enemy.state === 'destroy') {
        this.squad.enemiesCollection[indexRow].splice(indexEnemy, 1) // destroy enemy
      }
      enemy.draw(this.ctx)
    })

    if (row.length === 0) { // destoy row if is empty
      this.squad.enemiesCollection.splice(indexRow, 1)
    }
  })

  this.squad.move()
  if (Date.now() - this._timestampSquad > (3000 / setup.bombTimer) && !this.squad.isDestroyed()) {
    this._timestampSquad = Date.now()
    this.squad.atack()
  }
}

Game.prototype.drawScore = function () {
  this.ctx.font = 'bold 20px Phosphate'
  this.ctx.fillStyle = 'green'
  this.ctx.fillText(`points: ${this.totalPoints}`, this.maxWidth / 10, this.maxHeight / 20)
  this.ctx.fillText(`level: ${this.level}`, this.maxWidth / 2, this.maxHeight / 20 * 2)
  this.ctx.fillText(`lives: ${this.livesOfPlayer}`, this.maxWidth / 10 * 8, this.maxHeight / 20)
  this.livesCounter.drawStrip(this.ctx, this.maxWidth / 10 * 9, this.maxHeight / 20 * 0.5,
    this.livesCounter.widthFrame / 2, this.livesCounter.heightFrame / 2,
    this.livesOfPlayer)

  if (this.debug) {
    this.ctx.font = '9px Arial'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(`xMin: ${this.squad._xMinSquad} xMax: ${this.squad._xMaxSquad} yMax: ${this.squad._yMaxSquad} bombs: ${this.squad.bombBuffer.length}`, this.maxWidth / 10 * 7, this.maxHeight / 20 * 19)
  }
}

Game.prototype.checkCollisions = function () {
  //   COLLISION BOMB WITH OTHERS
  this.squad.bombBuffer.forEach((bomb, indexBomb) => {
    // Collision bomb with player
    if (this._collision(bomb, this.player) && this.player.state === 'combat') {
      this.squad.bombBuffer.splice(indexBomb, 1)
      this.soundBossExplode.play()
      this.squad.bombCounter-- // decrease bombs in game zone. can shoot to bombMax in the round
      this.livesOfPlayer--
      this.player.state = 'hit'
    }

    // BOMB<>MISSILES
    if (this.missileBuffer.length > 0 && this.squad.bombBuffer.length > 0) {
      this.squad.bombBuffer.forEach((bomb, indexBomb) => {
        this.missileBuffer.forEach((missile, indexMissile) => {
          if (this._collision(bomb, missile)) {
            this.totalPoints += bomb.points
            this.soundOfBlasterHit.play()
            this.missileBuffer.splice(indexMissile, 1) // destroy missile
            this.squad.bombBuffer.splice(indexBomb, 1) // destroy bomb
            this.squad.bombCounter-- // decrease bombs in game zone. can shoot to bombMax in the round
          }
        })
      })
    }
  })

  // COLLISION MISSILE WITH ENEMIES
  this.missileBuffer.forEach((missile, indexMissile) => {
    // Collision missile with bosses
    if (this._collision(missile, this.boss)) {
      this.totalPoints += this.boss.points // increment points
      this.missileBuffer.splice(indexMissile, 1) // destroy missile
      this.boss.state = 'hit'
      this.soundOfEnemyKilled.play()
      // this.boss = undefined; //destroy boss
    }
    // collision missile with enemy
    this.squad.enemiesCollection.forEach((squadRow, indexRow) => {
      squadRow.forEach((enemy, indexEnemy) => {
        if (this._collision(missile, enemy)) {
          this.totalPoints += enemy.points // increment points
          this.missileBuffer.splice(indexMissile, 1) // destroy missile
          // this.squad.enemiesCollection[indexRow].splice(indexEnemy, 1); //destroy enemy
          enemy.state = 'hit'
          this.soundOfEnemyKilled.play()
        }
      })
    })
  })
}

Game.prototype._collision = function (object1, object2) {
  if (object1 === undefined || object2 === undefined) {
    return false
  }

  this.x = object1.x + this._offSetSprite
  this.y = object1.y + this._offSetSprite
  this.w = object1.width - this._offSetSprite
  this.h = object1.height - this._offSetSprite
  this.x2 = object2.x + this._offSetSprite
  this.y2 = object2.y + this._offSetSprite
  this.w2 = object2.width - this._offSetSprite
  this.h2 = object2.height - this._offSetSprite
  // control of areas with offset for best & fine control
  // x2 is in the width (x + w) of object1 and x1 is in the width (x2 + w2) of object2
  // y2 is in the height (y + h) of object1 and y1 is in the height (y2 + h2) of object2
  return this.x + this.w >= this.x2 && this.x <= this.x2 + this.w2
    && this.y + this.h >= this.y2 && this.y <= this.y2 + this.h2
}

Game.prototype.draw = function () {
  // this.idAnimation = requestAnimationFrame(this._update.bind(this)); //sustituye al setinterval y presenta 60frm/sec

  if (this.player.state === 'destroy' && this.livesOfPlayer > 0) {
    this.player.state = 'combat'
  }

  if (this.livesOfPlayer <= 0 && this.player.state === 'destroy') {
    this.state = 'lost'
    // console.log('GAME OVER');
  }

  if (this.squad.isDestroyed() && !this.boss && this.livesOfPlayer > 0) { // destroyed squad and bosses
    this.state = 'win'
  }

  // random boss in max.30s
  if (!this.boss && Date.now() - this._timeStampBoss > (30000 / this.enemyBossTimer)) {
    this._timeStampBoss = Date.now()
    this.boss = new Enemy(this.maxWidth - 10, this.maxHeight / 8, 'boss') //  Make the boss
  }

  if ((Date.now() - this._timeStamp) > (1000 / setup.fps) / this.level) {
    this._timeStamp = Date.now()

    this.manageBufferOfKeysPressed()
    this.drawSky()
    this.drawMissile()
    this.drawBomb()
    this.drawPlayer()
    this.drawSquad()
    this.drawBoss()
    this.checkCollisions()
    this.drawScore()
  }
}
