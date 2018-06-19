function Squad(rowsOfEnemies, columnsOfEnemies) {
  this.enemiesCollection = [];
  //this._enemiesCoordinates = [];
  this.xSquad = Math.floor( setup.limitWidth / 6);
  this.ySquad = Math.floor(setup.limitHeight / 5);
  this.xMaxSquad = Math.floor(setup.limitWidth / 6) * 3;
  this.yMaxSquad = Math.floor(setup.limitHeight / 5) * 3;
  //this._fillCoordinates();
  this._enroll(rowsOfEnemies, columnsOfEnemies);
}

Squad.prototype._enroll = function (rowsOfEnemies, columnsOfEnemies) {

  for (var i = 0; i < rowsOfEnemies; i++) {       //make array 5X11
    this.enemiesCollection[i] = new Array(columnsOfEnemies);
  }

  for (var n3Col = 0; n3Col < columnsOfEnemies; n3Col++) { //Level 3 
    this.enemiesCollection[0][n3Col] = new Enemy(this.xSquad + n3Col * 50, this.ySquad, 'official');
  }
  for (var n2Row = 1; n2Row < 3; n2Row++) {
    for (var n2Col = 0; n2Col < columnsOfEnemies; n2Col++) { //Level 2
       this.enemiesCollection[n2Row][n2Col] = new Enemy(this.xSquad + n2Col * 50,this.ySquad+n2Row*50, 'veteran');
     }
   }
  for (var n1Row = 3; n1Row < 5; n1Row++) {
    for (var n1Col = 0; n1Col < columnsOfEnemies; n1Col++) { //Level 1
      this.enemiesCollection[n1Row][n1Col] = new Enemy(this.xSquad + n1Col * 50,this.ySquad+n1Row*50, 'rookie');
    }
  }
};
Squad.prototype.move = function () {

};

Squad.prototype.atack = function () {

  //dispara la clase

};
