function Player(xPos, yPos) {

  this.mask = undefined;
  this.x = xPos;
  this.y = yPos;
  this.width = setup.playerWidth;
  this.height = setup.playerHeiht;
  this.timeStampLastShot = Date.now();
}

Player.prototype.goLeft = function () {
  this.x -= 10;
};

Player.prototype.goRight = function () {
  this.x += 10;
};

Player.prototype.fire = function () {
//TODO: sound of fire

  if (Date.now() - this.timeStampLastShot > (1000 / setup.missileMax)) {
    this.timeStampLastShot = Date.now();
    return new Projectile({ type: 'missile', gunner: this });
  }
  else return false;
};
