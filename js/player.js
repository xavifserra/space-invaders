function Player(xPos, yPos) {

  this.x = xPos;
  this.y = yPos;
  this.width = setup.playerWidth;
  this.height = setup.playerHeiht;
  this.color = setup.playerColor;
}

Player.prototype.goLeft = function () {
  this.x -= 5;
};

Player.prototype.goRight = function () {
  this.x += 5;
};

Player.prototype.fire = function () {
  return new Projectile({
    type: 'missile',
    gunner: this
  });
};

