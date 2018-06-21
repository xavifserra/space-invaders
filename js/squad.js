function Squad(rowsOfEnemies, columnsOfEnemies) {
  this.enemiesCollection = [];
  //this._enemiesCoordinates = [];
  this.xSquad = Math.floor(setup.limitWidth / 6);
  this.ySquad = Math.floor(setup.limitHeight / 5);
  this._xMinSquad = setup.limitWidth;
  this._xMaxSquad = 0;
  this._yMaxSquad = 0;
  //this._fillCoordinates();
  this._goToRight = true;
  this._goToLeft = false;
  //fill the squad
  this._enroll(rowsOfEnemies, columnsOfEnemies);
}

Squad.prototype._enroll = function (rowsOfEnemies, columnsOfEnemies) {

  for (var i = 0; i < rowsOfEnemies; i++) { //make array 5X11
    this.enemiesCollection[i] = new Array(columnsOfEnemies);
  }

  for (var n3Col = 0; n3Col < columnsOfEnemies; n3Col++) { //Level 3 
    this.enemiesCollection[0][n3Col] = new Enemy(this.xSquad + n3Col * setup.enemySpace, this.ySquad, 'official');
  }
  for (var n2Row = 1; n2Row < 3; n2Row++) {
    for (var n2Col = 0; n2Col < columnsOfEnemies; n2Col++) { //Level 2
      this.enemiesCollection[n2Row][n2Col] = new Enemy(this.xSquad + n2Col * setup.enemySpace, this.ySquad + n2Row * setup.enemySpace, 'veteran');
    }
  }
  for (var n1Row = 3; n1Row < 5; n1Row++) {
    for (var n1Col = 0; n1Col < columnsOfEnemies; n1Col++) { //Level 1
      this.enemiesCollection[n1Row][n1Col] = new Enemy(this.xSquad + n1Col * setup.enemySpace, this.ySquad + n1Row * setup.enemySpace, 'rookie');
    }
  }
};

Squad.prototype.move = function () {

  this.enemiesCollection.forEach(function (row) {
    row.forEach(function (element) {
      if (element.y > this._yMaxSquad) { //enemy in the bottom 
        this._yMaxSquad = element.y;
      }
      if (element.x >= this._xMaxSquad) { //enemy in the right 
        this._xMaxSquad = element.x;
      }
      if (element.x < this._xMinSquad) { //enemy in the left 
        this._xMinSquad = element.x;
      }
    }.bind(this));
  }.bind(this));

  if (this._xMaxSquad + setup.velocityEnemy < setup.limitWidth - setup.enemyWidth && this._goToRight) {
    this._moveSquadTo('right');
  }
  if (this._xMaxSquad + setup.velocityEnemy >= setup.limitWidth - setup.enemyWidth * 2 && this._goToRight) {
    this._moveSquadTo('down');
    this._goToRight = false;
    this._goToLeft = true;
    this._xMaxSquad = 0;
    this._xMinSquad = setup.limitHeight;
    this._moveSquadTo('left');
  }
  if (this._xMinSquad - setup.velocityEnemy > setup.enemyWidth && this._goToLeft) {
    this._moveSquadTo('left');
  }
  if (this._xMinSquad - setup.velocityEnemy <= setup.enemyWidth && this._goToLeft) {
    this._moveSquadTo('down');
    this._goToRight = true;
    this._goToLeft = false;
    this._xMaxSquad = 0;
    this._xMinSquad = setup.limitHeight;
    this._moveSquadTo('right');
  }
  if (this._yMaxSquad === setup.xPlayerPos()) {
    return true;
  }
};

Squad.prototype._moveSquadTo = function (direction) {
  for (var col = 0; col < this.enemiesCollection.length; col++) {
    for (var row = 0; row < this.enemiesCollection[col].length; row++) {
      enemySelected = this.enemiesCollection[col][row];
      if (enemySelected) {
        switch (direction) {
          case 'right':
            enemySelected.goRight();
            break;
          case 'left':
            enemySelected.goLeft();
            break;
          case 'down':
            enemySelected.goDown();
            break;
        }
      }
    }
  }
};

Squad.prototype.atack = function () {

  //dispara la clase

};