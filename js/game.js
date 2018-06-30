function Game(ctx, keysBuffer) {

  this.live = 3;
  this.totalPoints = 0;
  this.level = 1;
  this.maxWidth = setup.limitWidth;
  this.maxHeight = setup.limitHeight;
  this.ctx = ctx;
  this.keysBuffer = keysBuffer;
  this.missileBuffer = [];
  this.debug = true;
  this.isPaused = false;
  this.idAnimation = undefined;
  this.state = 'play'; //valid: 'play','pause','win','lost' 

  //control of FPS
  this._timeStamp = Date.now();
  this._timeStampMissile = Date.now();
  this._timeStampBoss = Date.now();

  //player & enemies
  this.boss = undefined;
  this.player = new Player(setup.playerPosX(), setup.playerPosY());
  this.squad = new Squad(setup.enemiesInRow, setup.enemiesInColumn);

  //sounds
  this.soundOfShoot = new Sound(sounds.soundShoot);
  this.soundOfExplosion = new Sound(sounds.soundExplosion);
  this.soundOfEnemyKilled = new Sound(sounds.soundEnemyKilled);
  this.soundOfBoss = new Sound(sounds.soundBoss);
  this.soundOfBlasterHit = new Sound(sounds.soundHit);
}

Game.prototype.manageBufferOfKeysPressed = function () {

  if (this.keysBuffer.KeyP) { //key P => Pause
    this.state = 'pause';
  }

  if (this.keysBuffer.Enter) { //Key enter 

  }
  if (this.keysBuffer.Space) { //space => fire
    this.playerFire();
  }
  if (this.keysBuffer.ArrowLeft) { //arrow left
    this.player.goLeft();
  }
  if (this.keysBuffer.ArrowRight) { //arrow right
    this.player.goRight();
  }
  if (this.keysBuffer.Space && this.keysBuffer.ArrowLeft) { //left+fire
    this.playerFire();
    this.player.goLeft();
  }
  if (this.keysBuffer.Space && this.keysBuffer.ArrowRight) { //right+fire
    this.playerFire();
    this.player.goRight();
  }
};

Game.prototype.drawStars = function () {
  //TODO: make stars in the sky
  this.ctx.clearRect(0, 0, this.maxWidth, this.maxHeight);
  //this.ctx.fillStyle = setup.boardColor;
  //this.ctx.fillRect(0, 0, this.maxWidth, this.maxHeight);
};

Game.prototype.drawPlayer = function () {
  if (this.player.x < 1) {
    this.player.x = 1;
  }
  if (this.player.x > this.maxWidth - this.player.width) {
    this.player.x = this.maxWidth - this.player.width;
  }
  this.player.draw(this.ctx);
  //this.ctx.fillStyle = this.player.color;
  //this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
};

Game.prototype.playerFire = function () {
  if (Date.now() - this._timeStampMissile > (1000 / setup.missileMax)) {
    this._timeStampMissile = Date.now();
    this.missileBuffer.push(this.player.fire());
    this.soundOfShoot.play();
  }
};

Game.prototype.drawBoss = function () {
  if (this.boss) {
    this.boss.goLeft();
    this.boss.draw(this.ctx);
    // this.ctx.fillStyle = this.boss.color;
    // this.ctx.fillRect(this.boss.x, this.boss.y, this.boss.width, this.boss.height);
    this.soundOfBoss.play();
    if (this.boss.x < 0 || this.boss.state === 'destroy') { //out of area
      this.boss = undefined;
    }
  }
};

Game.prototype.drawMissile = function () {

  if (this.missileBuffer.length > 0) {
    this.missileBuffer.forEach(function (missile, index) {
      if (missile.y > 1 && missile.y < this.maxHeight) {
        missile.trajectory();
        missile.draw(this.ctx);
        // this.ctx.fillStyle = missile.color;
        // this.ctx.fillRect(missile.x, missile.y, missile.width, missile.height);      
      } else {
        this.missileBuffer.splice(index, 1);
      }
    }.bind(this));
  }
};

Game.prototype.drawBomb = function () {

  if (this.squad.bombBuffer.length > 0) {
    this.squad.bombBuffer.forEach(function (bomb, index) {
      if (bomb.y > 1 && bomb.y < this.maxHeight - 26) {
        bomb.trajectory();
        bomb.draw(this.ctx);
        // this.ctx.fillStyle = bomb.color;
        // this.ctx.fillRect(bomb.x, bomb.y, bomb.width, bomb.height);
      } else {
        this.squad.bombBuffer.splice(index, 1);
        this.squad.bombCounter--;
      }
    }.bind(this));
  }
};

Game.prototype.drawSquad = function () {

  this.squad.enemiesCollection.forEach(function (row, indexRow) {
    row.forEach(function (enemy, indexEnemy) {
      if (enemy.state === 'destroy') {
        this.squad.enemiesCollection[indexRow].splice(indexEnemy, 1); //destroy enemy
      }
      enemy.draw(this.ctx);
      // this.ctx.fillStyle = enemy.color;
      // this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }.bind(this));
  }.bind(this));

  this.squad.move();
  this.squad.atack();
};

Game.prototype.drawScore = function () {
  this.ctx.font = "bold 20px Phosphate";
  this.ctx.fillStyle = 'green';
  this.ctx.fillText(`points: ${this.totalPoints}`, this.maxWidth / 10, this.maxHeight / 20 * 2);
  this.ctx.fillText(`live: ${this.live}`, this.maxWidth / 10 * 8, this.maxHeight / 20 * 2);
  if (this.debug) {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = 'red';
    this.ctx.fillText(`xMin: ${this.squad._xMinSquad} xMax: ${this.squad._xMaxSquad} yMax: ${this.squad._yMaxSquad} bombs: ${this.squad.bombBuffer.length}`, this.maxWidth / 10 * 4, this.maxHeight / 20);
  }
};

Game.prototype.checkCollisions = function () {

  //   COLLISION BOMB WITH OTHERS 
  this.squad.bombBuffer.forEach(function (bomb, indexBomb) {
    //Collision bomb with player
    if (this._collision(bomb, this.player)) {
      this.squad.bombBuffer.splice(indexBomb, 1);
      this.soundOfExplosion.play();
      this.squad.bombCounter--; //decrease bombs in game zone. can shoot to bombMax in the round  
      this.live--;
      this.player.state = 'hit';
    }

    //BOMB<>MISSILES
    if (this.missileBuffer.length > 0 && this.squad.bombBuffer.length > 0) {
      this.squad.bombBuffer.forEach(function (bomb, indexBomb) {
        this.missileBuffer.forEach(function (missile, indexMissile) {
          if (this._collision(bomb, missile)) {
            this.totalPoints += bomb.points;
            this.soundOfBlasterHit.play();
            this.missileBuffer.splice(indexMissile, 1); //destroy missile
            this.squad.bombBuffer.splice(indexBomb, 1); //destroy bomb
            this.squad.bombCounter--; //decrease bombs in game zone. can shoot to bombMax in the round  
          }
        }.bind(this));
      }.bind(this));
    }
  }.bind(this));

  //COLLISION MISSILE WITH ENEMIES
  this.missileBuffer.forEach(function (missile, indexMissile) {
    //Collision missile with bosses
    if (this._collision(missile, this.boss)) {
      this.totalPoints += this.boss.points(); //increment points 
      this.missileBuffer.splice(indexMissile, 1); //destroy missile     
      this.boss.state = 'hit';
      this.soundOfEnemyKilled.play();
      //this.boss = undefined; //destroy boss
    }
    //collision missile with enemy
    this.squad.enemiesCollection.forEach(function (squadRow, indexRow) {
      squadRow.forEach(function (enemy, indexEnemy) {
        if (this._collision(missile, enemy)) {
          this.totalPoints += enemy.points; //increment points 
          this.missileBuffer.splice(indexMissile, 1); //destroy missile 
          //this.squad.enemiesCollection[indexRow].splice(indexEnemy, 1); //destroy enemy
          enemy.state = 'hit';
          this.soundOfEnemyKilled.play();
        }
      }.bind(this));
    }.bind(this));
  }.bind(this));

};

Game.prototype._collision = function (object1, object2) {

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

Game.prototype.init = function () {
  this._update();
};

Game.prototype._update = function () {

  this.idAnimation = requestAnimationFrame(this._update.bind(this)); //sustituye al setinterval y presenta 60frm/sec
  if (this.player.state === 'destroy') {
    this.state = 'lost';
    console.log('GAME OVER');
  } //TODO: resolver cambio vida
  if (this.squad.isDestroyed() && !this.boss) { //destroyed squad and bosses
    this.state = 'win';
  }

  if ((Date.now() - this._timeStamp) > (1000 / setup.fps)) {

    this.manageBufferOfKeysPressed();
    if (!this.isPaused) {
      this._timeStamp = Date.now();
      this.drawStars();
      this.drawMissile();
      this.drawBomb();
      this.drawPlayer();
      this.drawSquad();
      this.drawBoss();
      this.checkCollisions();
      this.drawScore();
    }
  }

  //random boss in max.30s
  if (!this.boss && Date.now() - this._timeStampBoss > 30000 / setup.enemyBossTimer()) {
    this._timeStampBoss = Date.now();
    this.boss = new Enemy(this.maxWidth - 10, this.maxHeight / 8, 'boss'); //  Make the boss 
  }

};