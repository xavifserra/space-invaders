function Player(xPos, yPos) {

  this.imageCenter = undefined;
  this.imageLeft=setup.playerImage;
  this.imageRight=setup.playerImage;
  this.x = xPos;
  this.y = yPos;
  this.width = setup.playerWidth;
  this.height = setup.playerHeiht;
  this._timeStampLastShot = Date.now();
  this.color=setup.playerColor;
}

Player.prototype.goLeft = function () {
  this.x -= 5;
};

Player.prototype.goRight = function () {
  this.x += 5;
};

Player.prototype.fire = function () {
//TODO: sound of fire

  if (Date.now() - this._timeStampLastShot > (1000 / setup.missileMax)) {
    this._timeStampLastShot = Date.now();
    return new Projectile({ type: 'missile', gunner: this });
  }
  else return false;
};

Player.prototype.kill=function(){

};