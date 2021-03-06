function Squad(enemiesInRow, enemiesInColumn, spaceBetweenEnemies, limitWidth, limitHeight, speed, enemySquadWidth, enemySquadHeight) {
  this.enemiesCollection = []
  this.bombBuffer = []
  this.limitWidth = limitWidth
  this.limitHeight = limitHeight
  // this._enemiesCoordinates = [];
  this.xSquad = Math.floor(this.limitWidth / 6)
  this.ySquad = Math.floor(this.limitHeight / 5)
  this._xMinSquad = this.limitWidth
  this._xMaxSquad = 0
  this._yMaxSquad = 0
  // this._fillCoordinates();
  this._goToRight = true
  this._goToLeft = false
  this._timeStampLastShot = Date.now()
  // this.bombCounter = 0;
  this.bombMax = weapons.bomb.ratio //.bombMax
  this.spaceBetweenEnemies = spaceBetweenEnemies
  this.legionaryWidth = enemySquadWidth
  this.legionaryHeight = enemySquadHeight
  this.speed = speed

  // fill the squad
  this._enroll(enemiesInRow, enemiesInColumn)
}

Squad.prototype._enroll = function (rowsOfEnemies, columnsOfEnemies) {
  // make array rowsXcolumns
  for (let i = 0; i < rowsOfEnemies; i++) {
    this.enemiesCollection[i] = new Array(columnsOfEnemies)
  }

  for (let n3Col = 0; n3Col < columnsOfEnemies; n3Col++) {
    // Level 3
    this.enemiesCollection[0][n3Col] = new Enemy(
      this.xSquad + n3Col * this.spaceBetweenEnemies,
      this.ySquad,
      'official',
      this.legionaryWidth,
      this.legionaryHeight,
      this.speed
    )
  }
  for (let n2Row = 1; n2Row < 3; n2Row++) {
    for (let n2Col = 0; n2Col < columnsOfEnemies; n2Col++) {
      // Level 2
      this.enemiesCollection[n2Row][n2Col] = new Enemy(
        this.xSquad + n2Col * this.spaceBetweenEnemies,
        this.ySquad + n2Row * this.spaceBetweenEnemies,
        'veteran',
        this.legionaryWidth,
        this.legionaryHeight,
        this.speed,
      )
    }
  }
  for (let n1Row = 3; n1Row < rowsOfEnemies; n1Row++) {
    for (let n1Col = 0; n1Col < columnsOfEnemies; n1Col++) {
      // Level 1
      this.enemiesCollection[n1Row][n1Col] = new Enemy(
        this.xSquad + n1Col * this.spaceBetweenEnemies,
        this.ySquad + n1Row * this.spaceBetweenEnemies,
        'rookie',
        this.legionaryWidth,
        this.legionaryHeight,
        this.speed
      )
    }
  }
  // console.log(this.enemiesCollection);
}

Squad.prototype._moveEnemyTo = function (direction) {
  this.enemiesCollection.forEach((row) => {
    row.forEach((enemy) => {
      switch (direction) {
        case 'right':
          enemy.goRight()
          break
        case 'left':
          enemy.goLeft()
          break
        case 'down':
          enemy.goDown()
          break
        default:
          break
      }
    })
  })
}

Squad.prototype.isDestroyed = function () {
  return this.enemiesCollection.length === 0
}

Squad.prototype.atack = function () {
  // var shootOK;
  const enemiesCanShoot = []
  let shootRandomInEnemiesCanShoot = null

  // search enemies who can shoot
  this.enemiesCollection.forEach((row) => {
    row.forEach((enemy) => {
      enemiesCanShoot.push(enemy)
    })
  })
  // order fire to random enemy can shot
  shootRandomInEnemiesCanShoot = enemiesCanShoot[Math.floor(Math.random() * (enemiesCanShoot.length - 1))]
  // shootOk = enemyShootRandom.fire();
  this.bombBuffer.push(shootRandomInEnemiesCanShoot.fire())
}

Squad.prototype.move = function () {
  this.enemiesCollection.forEach((row) => {
    row.forEach((enemy) => {
      if (enemy.y > this._yMaxSquad) {
        // enemy in the bottom
        this._yMaxSquad = enemy.y
      }
      if (enemy.x >= this._xMaxSquad) {
        // enemy in the right
        this._xMaxSquad = enemy.x
      }
      if (enemy.x < this._xMinSquad) {
        // enemy in the left
        this._xMinSquad = enemy.x
      }
    })
  })

  if (this._xMaxSquad + this.speed < this.limitWidth - this.legionaryWidth && this._goToRight) {
    this._moveEnemyTo('right')
  }
  if (this._xMinSquad - this.speed > this.legionaryWidth && this._goToLeft) {
   this._moveEnemyTo('left')
  }
  if (this._xMaxSquad + this.speed >= this.limitWidth - this.legionaryWidth * 2 && this._goToRight) {
    this._moveEnemyTo('down')
    this._goToRight = false
    this._goToLeft = true
    this._xMaxSquad = 0
    this._xMinSquad = this.limitHeight
    this._moveEnemyTo('left')
  }
  if (this._xMinSquad - this.speed <= this.legionaryWidth && this._goToLeft) {
    this._moveEnemyTo('down')
    this._goToRight = true
    this._goToLeft = false
    this._xMaxSquad = 0
    this._xMinSquad = this.limitHeight
    this._moveEnemyTo('right')
  }
  if (this._yMaxSquad === this.limitHeight - 20) {
    // } playerPosX()) {
    return true
  }
  return false // TODO: observe comportament
}
