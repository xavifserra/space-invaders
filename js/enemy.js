function Enemy(xPos, yPos, role) {

  this.type = undefined;
  this.color = undefined;
  this.points = undefined;
  this.mask = undefined;
  this.x = xPos;
  this.y = yPos;
  this.width = setup.enemyWidth;
  this.height = setup.enemyHeiht;
  this.enemyVelocity=setup.enemyVelocity;
  this._selectRole(role);
}

Enemy.prototype.goLeft = function () {
  this.x -= this.enemyVelocity;
};

Enemy.prototype.goRight = function () {
  this.x += this.enemyVelocity;
};

Enemy.prototype.goUp = function () {
  this.y += this.enemyVelocity;
};

Enemy.prototype.goDown = function () {
  this.y += this.enemyVelocity * 2;
};

Enemy.prototype._selectRole = function (role) {

  switch (role) {
    case 'rookie':
      this.type = role;
      this.color = setup.enemyL1Color;
      this.points = setup.enemyL1Points;
      break;
    case 'veteran':
      this.type = role;
      this.color = setup.enemyL2Color;
      this.points = setup.enemyL2Points;
      break;
    case 'official':
      this.type = role;
      this.color = setup.enemyL3Color;
      this.points = setup.enemyL3Points;
      break;
    case 'boss':
      this.type = role;
      this.color = setup.enemyBossColor;
      this.points = setup.enemyBossPoints;
      break;
  }
};

Enemy.prototype.fire = function () {
    return new Projectile({ type: 'bomb', gunner: this });
};

Enemy.prototype.sprite = function () {
  //llevar a la funcion de animación
  var rows = 2;
  var cols = 6;
  var trackRight = 0;
  var trackLeft = 1;
  var widthFrame = spriteWidth / cols;
  var heightFrame = spriteHeight / rows;
  var currentFrame = 0;
  var frameCount = 6;
  var xSprite = 0;
  var ySprite = 0;
};