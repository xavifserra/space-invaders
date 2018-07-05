function Enemy(xPos, yPos, role) {

  this.type = undefined;
  this.color = undefined;
  this.points = undefined;
  this.x = xPos;
  this.y = yPos;
  this.width = setup.enemyWidth;
  this.height = setup.enemyHeiht;
  this.enemyVelocity = setup.enemyVelocity;
  this._selectRole(role);
  this.state = 'combat';
  this._timeStampSprite = Date.now();
}

Enemy.prototype.goLeft = function () {
  this.x -= this.enemyVelocity;
  this.character.updateFrame(0);
};

Enemy.prototype.goRight = function () {
  this.x += this.enemyVelocity;
  this.character.updateFrame(0);
};

Enemy.prototype.goUp = function () {
  this.y += this.enemyVelocity;
  this.character.updateFrame(0);
};

Enemy.prototype.goDown = function () {
  this.y += this.enemyVelocity * 2;
  this.character.updateFrame(0);
};

Enemy.prototype._selectRole = function (role) {

  switch (role) {
    case 'rookie':
      this.type = role;
      this.color = setup.enemyL1Color;
      this.points = setup.enemyL1Points;
      this.character = new Sprite(setup.enemyL1Image, 1, 3, 117, 36, 3);
      this.explosion = new Sprite(explosions.type3.image, explosions.type3.rows, explosions.type3.cols, explosions.type3.width, explosions.type3.height, explosions.type3.frames);
      break;
    case 'veteran':
      this.type = role;
      this.color = setup.enemyL2Color;
      this.points = setup.enemyL2Points;
      this.character = new Sprite(setup.enemyL2Image, 1, 3, 69, 24, 3); //TODO: cambiar num por var
      this.explosion = new Sprite(explosions.type3.image, explosions.type3.rows, explosions.type3.cols, explosions.type3.width, explosions.type3.height, explosions.type3.frames);
      break;
    case 'official':
      this.type = role;
      this.color = setup.enemyL3Color;
      this.points = setup.enemyL3Points;
      this.character = new Sprite(setup.enemyL3Image, 1, 3, 69, 24, 3);
      this.explosion = new Sprite(explosions.type3.image, explosions.type3.rows, explosions.type3.cols,explosions.type3.width, explosions.type3.height, explosions.type3.frames);
      break;
    case 'boss':
      this.type = role;
      this.color = setup.enemyBossColor;
      this.points = setup.enemyBossPoints();
      this.width = setup.enemyBossWidth;
      this.height = setup.enemyBossHeiht;
      this.character = new Sprite(setup.enemyBossImage, 1, 3,144,49,3);// 120, 43, 3);
      this.explosion = new Sprite(explosions.type2.image, explosions.type2.rows, explosions.type2.cols,explosions.type2.width, explosions.type2.height, explosions.type2.frames);
      break;
  }
};

Enemy.prototype.fire = function () {
  return new Projectile({
    type: 'bomb',
    gunner: this
  });
};

Enemy.prototype.draw = function (ctx) {

  switch (this.state) {
    case 'combat':
      this.character.draw(ctx, this.x, this.y, this.width, this.height);
      this.character.selectStrip(0);
      break;
    case 'hit':
      this.explosion.draw(ctx, this.x - this.width / 1.5, this.y - this.height / 1.5, this.width * 1.5, this.height * 1.5);
      if (this.explosion.currentFrame >= this.explosion.framesTotal - 1) {
        this.state = 'destroy';
      }
      break;
    case 'destroy':
      ctx.fillStyle = 'rgba(0,0,0,0)';//'black';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      break;
  }
};