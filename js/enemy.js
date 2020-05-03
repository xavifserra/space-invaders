function Enemy(xPos, yPos, role) {
  this.type = undefined
  this.color = undefined
  this.points = undefined
  this.x = xPos
  this.y = yPos
  this.width = setup.enemySquadWidth
  this.height = setup.enemySquadHeiht
  this.enemiesVelocity = setup.enemiesVelocity
  this._selectRole(role)
  this.state = 'combat'
  this._timeStampSprite = Date.now()
}

Enemy.prototype.goLeft = function () {
  this.x -= this.enemiesVelocity
  this.character.updateFrame(0)
};

Enemy.prototype.goRight = function () {
  this.x += this.enemiesVelocity
  this.character.updateFrame(0)
};

Enemy.prototype.goUp = function () {
  this.y += this.enemiesVelocity
  this.character.updateFrame(0)
};

Enemy.prototype.goDown = function () {
  this.y += this.enemiesVelocity * 2
  this.character.updateFrame(0)
};

Enemy.prototype._selectRole = function (role) {
  switch (role) {
    case 'rookie':
      this.type = role
      this.color = enemies.rookie.color
      this.points = enemies.rookie.points
      this.character = new Sprite(enemies.rookie.image, 1, 3, 117, 36, 3)
      this.explosion = new Sprite(
        explosions.type3.image,
        explosions.type3.rows,
        explosions.type3.cols,
        explosions.type3.width,
        explosions.type3.height,
        explosions.type3.frames,
      )
      break
    case 'veteran':
      this.type = role
      this.color = enemies.veteran.color
      this.points = enemies.veteran.points
      this.character = new Sprite(enemies.veteran.image, 1, 3, 69, 24, 3) // TODO: change num for var or parametre
      this.explosion = new Sprite(
        explosions.type3.image,
        explosions.type3.rows,
        explosions.type3.cols,
        explosions.type3.width,
        explosions.type3.height,
        explosions.type3.frames,
      )
      break
    case 'official':
      this.type = role
      this.color = enemies.official.color
      this.points = enemies.official.points
      this.character = new Sprite(enemies.official.image, 1, 3, 69, 24, 3)
      this.explosion = new Sprite(
        explosions.type3.image,
        explosions.type3.rows,
        explosions.type3.cols,
        explosions.type3.width,
        explosions.type3.height,
        explosions.type3.frames,
      )
      break;
    case 'boss':
      this.type = role
      this.color = enemies.boss.color
      this.points = enemies.boss.points();
      this.width = enemies.boss.width;
      this.height = enemies.boss.height;
      this.character = new Sprite(enemies.boss.image, 1, 3, 144, 49, 3); // 120, 43, 3);
      this.explosion = new Sprite(
        explosions.type2.image,
        explosions.type2.rows,
        explosions.type2.cols,
        explosions.type2.width,
        explosions.type2.height,
        explosions.type2.frames,
      )
      break;
    default:
      break
  }
}

Enemy.prototype.fire = function () {
  return new Projectile({
    type: 'bomb',
    gunner: this,
  })
};

Enemy.prototype.draw = function (ctx) {
  switch (this.state) {
    case 'combat':
      this.character.draw(ctx, this.x, this.y, this.width, this.height)
      this.character.selectStrip(0)
      break;
    case 'hit':
      this.explosion.draw(
        ctx,
        this.x - this.width / 1.5,
        this.y - this.height / 1.5,
        this.width * 1.5,
        this.height * 1.5,
      )
      if (this.explosion.currentFrame >= this.explosion.framesTotal - 1) {
        this.state = 'destroy';
      }
      break
    case 'destroy':
      ctx.fillStyle = 'rgba(0,0,0,0)'; // 'black';
      ctx.fillRect(this.x, this.y, this.width, this.height)
      break;
    default:
      break
  }
}
