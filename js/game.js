function Game(options) {

  this.lives = 3;
  this.totalPoints = 0;
  this.level = 1;
  this.maxWidth = setup.limitWidth;
  this.maxHeight = setup.limitHeight;
  this.ctx = options.ctx;

  //control of FPS
  this._timeStamp = Date.now();
  this._timeStampBoss = Date.now();
  //player & enemies
  this.boss = undefined;
  this.player = options.player;
  this.squad = options.squad;
}
Game.prototype._intro = function () {


};

Game.prototype._splash = function () {


};

Game.prototype._assignEventsToKeys = function () {

  window.addEventListener('keydown', function (e) {
    setup.keysBuffer[e.code] = true;
    console.log(e.code);
  });

  window.addEventListener('keyup', function (e) {
    setup.keysBuffer[e.code] = false;
  });
};

Game.prototype._manageBufferOfKeysPressed = function () {
  var shotOk; //Control undefined shot by fps. if projectile not false  

  if (setup.keysBuffer.KeyP) { //key P => Pause
    console.log('game paused');
  }
  if (setup.keysBuffer.Enter) { //Key enter 

  }
  if (setup.keysBuffer.Space) { //space => fire
    shotOk = this.player.fire();
    if (shotOk) {
      setup.missileBuffer.push(shotOk);
    }
  }
  if (setup.keysBuffer.ArrowLeft) { //arrow left
    this.player.goLeft();
  }
  if (setup.keysBuffer.ArrowRight) { //arrow right
    this.player.goRight();
  }
  if (setup.keysBuffer.Space && setup.keysBuffer.ArrowLeft) { //left+fire
    shotOk = this.player.fire();
    if (shotOk) {
      setup.missileBuffer.push(shotOk);
    }
    this.player.goLeft();
  }
  if (setup.keysBuffer.Space && setup.keysBuffer.ArrowRight) { //right+fire
    shotOk = this.player.fire();
    if (shotOk) {
      setup.missileBuffer.push(shotOk);
    }
    this.player.goRight();
  }
};

Game.prototype._drawStars = function () {
  //TODO: make stars in the sky
  this.ctx.fillStyle = setup.boardColor;
  this.ctx.fillRect(0, 0, this.maxWidth, this.maxHeight);
};

Game.prototype._drawPlayer = function () {
  if (this.player.x < 1) {
    this.player.x = 1;
  }
  if (this.player.x > this.maxWidth - this.player.width) {
    this.player.x = this.maxWidth - this.player.width;
  }
  this.ctx.fillStyle = setup.playerColor;
  this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
};

Game.prototype._drawBoss = function () {
  if (this.boss) {
    this.boss.goLeft();
    this.ctx.fillStyle = setup.enemyBossColor;
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

Game.prototype._drawSquad = function () {
  var enemySelected;

  for (var row = 0; row < this.squad.enemiesCollection.length; row++) {
    for (var col = 0; col < this.squad.enemiesCollection[row].length; col++) {
      enemySelected = this.squad.enemiesCollection[row][col];
      if (enemySelected) {
        this.ctx.fillStyle = enemySelected.color;
        this.ctx.fillRect(enemySelected.x, enemySelected.y, enemySelected.width, enemySelected.height);
      }
    }
  }
  this.squad.move();
};

Game.prototype.checkCollisions = function () {
  //TODO: collisions of bombs
  // this.player 
  if (setup.missileBuffer.length > 0) {
    for (var i = 0; i < setup.missileBuffer.length; i++) {
      missileSelected = setup.missileBuffer[i];
      //Collision with bosses
      if (this._checkCollision(missileSelected, this.boss)) {
        this.totalPoints += this.boss.points(); //increment points 
        setup.missileBuffer.splice(i, 1); //destroy missile 
        this.boss = undefined; //destroy boss
        //TODO: explosion image + sound
      }
      for (var col = 0; col < this.squad.enemiesCollection.length; col++) {
        for (var row = 0; row < this.squad.enemiesCollection[col].length; row++) {
          enemySelected = this.squad.enemiesCollection[col][row];
          if (enemySelected) {
            if (this._checkCollision(missileSelected, enemySelected)) {
              this.totalPoints += enemySelected.points; //increment points 
              setup.missileBuffer.splice(i, 1); //destroy missile 
              delete this.squad.enemiesCollection[col][row]; //destroy enemy 
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

Game.prototype._drawScore = function () {
  this.ctx.font = "16px Arial";
  this.ctx.fillStyle = 'green';
  this.ctx.fillText('points: ' + this.totalPoints, 50, this.maxHeight - 10);

  this.ctx.font = "16px Arial";
  this.ctx.fillStyle = 'red';
  this.ctx.fillText(`xMin: ${this.squad._xMinSquad} xMax: ${this.squad._xMaxSquad} yMax: ${this.squad._yMaxSquad}`, 550, this.maxHeight - 10);

};

Game.prototype.pause = function () {

};

Game.prototype.init = function () {
  this._assignEventsToKeys();
  this._update();
};

Game.prototype._update = function () {

  window.requestAnimationFrame(this._update.bind(this)); //sustituye al setinterval y presenta 60frm/sec

  if ((Date.now() - this._timeStamp) > (1000 / setup.fps)) {
    this._timeStamp = Date.now();
    this.checkCollisions();
    this._manageBufferOfKeysPressed();
    this._drawStars();
    this._drawProjectile();
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