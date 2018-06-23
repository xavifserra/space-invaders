function Game(ctx, keysBuffer) {

  this.lives = 3;
  this.totalPoints = 0;
  this.level = 1;
  this.maxWidth = setup.limitWidth;
  this.maxHeight = setup.limitHeight;
  this.ctx = ctx;
  this.keysBuffer = keysBuffer;

  //control of FPS
  this._timeStamp = Date.now();
  this._timeStampBoss = Date.now();

  //player & enemies
  this.boss = undefined;
  this.player = new Player(setup.playerPosX(), setup.playerPosY());
  this.squad = new Squad(setup.enemiesInRow, setup.enemiesInColumn);
  //sounds
  this.soundOfShoot = new Sound(setup.soundsOfGame.shoot);
  this.soundsOfExplosion = new Sound(setup.soundsOfGame.explosion);
  this.soundsOfEnemyKilled = new Sound(setup.soundsOfGame.enemyKilled);
}

Game.prototype._manageBufferOfKeysPressed = function () {
  var shootOk; //Control undefined shot by fps. if projectile not false  

  if (this.keysBuffer.KeyP) { //key P => Pause
    //alert('presionada la P');
    console.log('game paused');
  }
  if (this.keysBuffer.Enter) { //Key enter 

  }
  if (this.keysBuffer.Space) { //space => fire
    shootOk = this.player.fire();
    if (shootOk) {
      setup.missileBuffer.push(shootOk);
      this.soundOfShoot.play();
    }
  }
  if (this.keysBuffer.ArrowLeft) { //arrow left
    this.player.goLeft();
  }
  if (this.keysBuffer.ArrowRight) { //arrow right
    this.player.goRight();
  }
  if (this.keysBuffer.Space && this.keysBuffer.ArrowLeft) { //left+fire
    shootOk = this.player.fire();
    if (shootOk) {
      setup.missileBuffer.push(shootOk);
      this.soundOfShoot.play();
    }
    this.player.goLeft();
  }
  if (this.keysBuffer.Space && this.keysBuffer.ArrowRight) { //right+fire
    shootOk = this.player.fire();
    if (shootOk) {
      setup.missileBuffer.push(shootOk);
      this.soundOfShoot.play();
    }
    this.player.goRight();
  }
};

Game.prototype._drawStars = function () {
  //TODO: make stars in the sky
  this.ctx.clearRect(0, 0, this.maxWidth, this.maxHeight);
  //this.ctx.fillStyle = setup.boardColor;
  //this.ctx.fillRect(0, 0, this.maxWidth, this.maxHeight);
};

Game.prototype._drawPlayer = function () {
  if (this.player.x < 1) {
    this.player.x = 1;
  }
  if (this.player.x > this.maxWidth - this.player.width) {
    this.player.x = this.maxWidth - this.player.width;
  }
  this.ctx.fillStyle = this.player.color;
  this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
};

Game.prototype._drawBoss = function () {
  if (this.boss) {
    this.boss.goLeft();
    this.ctx.fillStyle = this.boss.color;
    this.ctx.fillRect(this.boss.x, this.boss.y, this.boss.width, this.boss.height);
    if (this.boss.x < 0) { //out of area
      this.boss = undefined;
    }
  }
};

Game.prototype._drawProjectile = function () {
  var missileSelected;
  if (setup.missileBuffer.length > 0) {
    //setup.missileBuffer.forEach(function (element)
    for (var i = 0; i < setup.missileBuffer.length; i++) {
      missileSelected = setup.missileBuffer[i];
      if (missileSelected.y > 1 && missileSelected.y < setup.limitHeight) {
        missileSelected.trajectory();
        this.ctx.fillStyle = missileSelected.color;
        this.ctx.fillRect(missileSelected.x, missileSelected.y, missileSelected.width, missileSelected.height);
      } else setup.missileBuffer.splice(i, 1);
    } //.bind(this));
  }
};

Game.prototype._drawBomb = function () {
  var bombSelected;
  if (this.squad.bombBuffer.length > 0) {
    for (var i = 0; i < this.squad.bombBuffer.length; i++) {
      bombSelected = this.squad.bombBuffer[i];
      if (bombSelected.y > 1 && bombSelected.y < setup.limitHeight) {
        bombSelected.trajectory();
        this.ctx.fillStyle = bombSelected.color;
        this.ctx.fillRect(bombSelected.x, bombSelected.y, bombSelected.width, bombSelected.height);
      } else {
        this.squad.bombBuffer.splice(i, 1);
        this.squad.bombCounter--;
      }
    }
  }
};

Game.prototype._drawSquad = function () {

  this.squad.enemiesCollection.forEach(function (row) {
    row.forEach(function (enemy) {
      this.ctx.fillStyle = enemy.color;
      this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }.bind(this));
  }.bind(this));

  this.squad.move();
  this.squad.atack();
};

Game.prototype._drawScore = function () {
  this.ctx.font = "16px Arial";
  this.ctx.fillStyle = 'green';
  this.ctx.fillText('points: ' + this.totalPoints, 50, this.maxHeight - 10);

  this.ctx.font = "16px Arial";
  this.ctx.fillStyle = 'red';
  this.ctx.fillText(`xMin: ${this.squad._xMinSquad} xMax: ${this.squad._xMaxSquad} yMax: ${this.squad._yMaxSquad}`, 550, 17);

};

Game.prototype.checkCollisions = function () {

  // BOMBS <> PLAYER 
  this.squad.bombBuffer.forEach(function (bomb) {
    if (this._checkCollision(bomb, this.player)) {
      this.soundsOfExplosion.play();
      //alert('GAME OVER');
      console.log('GAME OVER');
    }
    //BOMB<>MISSILES
    for (var missile = 0; missile < this.squad.bombBuffer.leng; missile++) {
      missileSelected = this.missileBuffer[missile];
      if (this._checkCollision(missileSelected, bombSelected)) {
        delete this.missileBuffer[missile]; //destroy missile
        delete this.squad.enemiesCollection[bomb]; //destroy bomb
      }
    }
  }.bind(this));


  //COLLISION WITH ENEMIES
  if (setup.missileBuffer.length > 0) {
    for (var missile = 0; missile < setup.missileBuffer.length; missile++) {
      missileSelected = setup.missileBuffer[missile];
      //Collision with bosses
      if (this._checkCollision(missileSelected, this.boss)) {
        this.totalPoints += this.boss.points(); //increment points 
        setup.missileBuffer.splice(missile, 1); //destroy missile 
        this.soundsOfEnemyKilled.play();
        this.boss = undefined; //destroy boss
        this.soundsOfEnemyKilled.play();
      }
      for (var col = 0; col < this.squad.enemiesCollection.length; col++) {
        for (var row = 0; row < this.squad.enemiesCollection[col].length; row++) {
          enemySelected = this.squad.enemiesCollection[col][row];
          if (enemySelected) {
            if (this._checkCollision(missileSelected, enemySelected)) {
              this.totalPoints += enemySelected.points; //increment points 
              setup.missileBuffer.splice(missile, 1); //destroy missile 
              delete this.squad.enemiesCollection[col][row]; //destroy enemy
              this.soundsOfEnemyKilled.play();
              //this.squad.enemiesCollection[col][row]=undefined;//destroy enemy and maintain the squad structure              //TODO: explosion image + sound
              //TODO: explosion image + sound
            }
          }
        }
      }
    }
  }
};

Game.prototype._checkCollision = function (object1, object2) {

  if (object1 === undefined || object2 === undefined) {
    return false;
  }

  this.x = object1.x;
  this.y = object1.y;
  this.w = object1.width;
  this.h = object1.height;
  this.x2 = object2.x;
  this.y2 = object2.y;
  this.w2 = object2.width;
  this.h2 = object2.height;
  //control of areas
  //x2 is in the width (x + w) of object1 and x1 is in the width (x2 + w2) of object2
  //y2 is in the height (y + h) of object1 and y1 is in the height (y2 + h2) of object2
  if (this.x + this.w >= this.x2 && this.x <= this.x2 + this.w2 &&
    this.y + this.h >= this.y2 && this.y <= this.y2 + this.h2) {
    return true;
  }
  return false;
};

Game.prototype.pause = function () {

};

Game.prototype.init = function () {
  //  this._assignEventsToKeys();

  this._update();
};

Game.prototype.restart = function () {

};

Game.prototype._update = function () {

  window.requestAnimationFrame(this._update.bind(this)); //sustituye al setinterval y presenta 60frm/sec

  if ((Date.now() - this._timeStamp) > (1000 / setup.fps)) {
    this._timeStamp = Date.now();
    this.checkCollisions();
    this._manageBufferOfKeysPressed();
    this._drawStars();
    this._drawProjectile();
    this._drawBomb();
    this._drawPlayer();
    this._drawSquad();
    this._drawBoss();
    this._drawScore();
    //random boss in max.30s
    if (!this.boss && Date.now() - this._timeStampBoss > 30000 / setup.enemyBossTimer()) {
      this._timeStampBoss = Date.now();
      this.boss = new Enemy(setup.limitWidth - 10, setup.limitHeight / 8, 'boss'); //  Make the boss 
    }
    //console.log('redraw');
  }
};