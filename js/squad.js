function Squad(enemiesInRow, enemiesInColumn) {
  this.enemiesCollection = []
  this.bombBuffer = []
  // this._enemiesCoordinates = [];
  this.xSquad = Math.floor(setup.limitWidth / 6)
  this.ySquad = Math.floor(setup.limitHeight / 5)
  this._xMinSquad = setup.limitWidth
  this._xMaxSquad = 0
  this._yMaxSquad = 0
  // this._fillCoordinates();
  this._goToRight = true
  this._goToLeft = false
  // fill the squad
  this._enroll(enemiesInRow, enemiesInColumn)
  this._timeStampLastShot = Date.now()
  // this.bombCounter = 0;
  this.bombMax = setup.bombMax
}

Squad.prototype._enroll = function (rowsOfEnemies, columnsOfEnemies) {
  // make array rowsXcolumns
  for (let i = 0; i < rowsOfEnemies; i++) {
    this.enemiesCollection[i] = new Array(columnsOfEnemies)
  }

  for (let n3Col = 0; n3Col < columnsOfEnemies; n3Col++) { // Level 3
    this.enemiesCollection[0][n3Col] = new Enemy(this.xSquad + n3Col * setup.enemySpace, this.ySquad, 'official')
  }
  for (let n2Row = 1; n2Row < 3; n2Row++) {
    for (let n2Col = 0; n2Col < columnsOfEnemies; n2Col++) { // Level 2
      this.enemiesCollection[n2Row][n2Col] = new Enemy(this.xSquad + n2Col * setup.enemySpace, this.ySquad + n2Row * setup.enemySpace, 'veteran')
    }
  }
  for (let n1Row = 3; n1Row < rowsOfEnemies; n1Row++) {
    for (let n1Col = 0; n1Col < columnsOfEnemies; n1Col++) { // Level 1
      this.enemiesCollection[n1Row][n1Col] = new Enemy(this.xSquad + n1Col * setup.enemySpace, this.ySquad + n1Row * setup.enemySpace, 'rookie')
    }
  }
}

Squad.prototype.move = function () {
  this.enemiesCollection.forEach((row) => {
    row.forEach((enemy) => {
      if (enemy.y > this._yMaxSquad) { // enemy in the bottom
        this._yMaxSquad = enemy.y
      }
      if (enemy.x >= this._xMaxSquad) { // enemy in the right
        this._xMaxSquad = enemy.x
      }
      if (enemy.x < this._xMinSquad) { // enemy in the left
        this._xMinSquad = enemy.x
      }
    })
  })

  if (this._xMaxSquad + setup.enemyVelocity < setup.limitWidth - setup.enemyWidth && this._goToRight) {
    this._moveSquadTo('right')
  }
  if (this._xMaxSquad + setup.enemyVelocity >= setup.limitWidth - setup.enemyWidth * 2 && this._goToRight) {
    this._moveSquadTo('down')
    this._goToRight = false
    this._goToLeft = true
    this._xMaxSquad = 0
    this._xMinSquad = setup.limitHeight
    this._moveSquadTo('left')
  }
  if (this._xMinSquad - setup.enemyVelocity > setup.enemyWidth && this._goToLeft) {
    this._moveSquadTo('left')
  }
  if (this._xMinSquad - setup.enemyVelocity <= setup.enemyWidth && this._goToLeft) {
    this._moveSquadTo('down')
    this._goToRight = true
    this._goToLeft = false
    this._xMaxSquad = 0
    this._xMinSquad = setup.limitHeight
    this._moveSquadTo('right')
  }
  if (this._yMaxSquad === setup.limitHeight - 20) { // } playerPosX()) {
    return true
  }
}

Squad.prototype._moveSquadTo = function (direction) {
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
      }
    })
  })
}

Squad.prototype.atack = function () {
  // var shootOK;
  const enemiesCanShoot = []
  let enemyShootRandom

  // search enemies who can shoot
  this.enemiesCollection.forEach((row) => {
    row.forEach((enemy) => {
      enemiesCanShoot.push(enemy)
    })
  })

  enemyShootRandom = enemiesCanShoot[Math.floor(Math.random() * (enemiesCanShoot.length - 1))]
  // shootOk = enemyShootRandom.fire();
  this.bombBuffer.push(enemyShootRandom.fire())
}

Squad.prototype.isDestroyed = function () {
  return this.enemiesCollection.length === 0
}
