function Enemy(xPos, yPos, role) {

  this.type = undefined;
  this.color = undefined;
  this.points = undefined;
  this.x = xPos;
  this.y = yPos;
  this.width = 18;
  this.height = 14;
  this._selectRole(role);
}

Enemy.prototype.goLeft = function () {
  this.x -= 3;
};
Enemy.prototype.goRight = function () {
  this.x += 3;
};
Enemy.prototype.goUp=function(){
  this.y += 3;
};
Enemy.prototype.goDown=function(){
  this.y+=3;
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
Enemy.prototype._animate = function () {
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