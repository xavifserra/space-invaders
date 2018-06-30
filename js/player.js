function Player(xPos, yPos) {

  this.x = xPos;
  this.y = yPos;
  this.width = setup.playerWidth;
  this.height = setup.playerHeiht;
  this.color = setup.playerColor;
  this.character = new Sprite(setup.playerImage, 3, 3, 120, 129, 3);
  this.explosion = new Sprite(explosions.type1.image, explosions.type1.rows, explosions.type1.cols, explosions.type1.width, explosions.type1.height, explosions.type1.frames); //1, 10, 1280, 128, 10);
  this.state = 'combat';
}

Player.prototype.goLeft = function () {
  this.x -= 5;
  this.character.selectStrip(1); //Select the strip who is drawed the left movement
};

Player.prototype.goRight = function () {
  this.x += 5;
  this.character.selectStrip(2); //Select the strip who is drawed the left movement
};

Player.prototype.fire = function () {
  return new Projectile({
    type: 'missile',
    gunner: this
  });
};

Player.prototype.draw = function (ctx) {

  switch (this.state) {
    case 'combat':
      this.character.draw(ctx, this.x, this.y, this.width, this.height);
      this.character.selectStrip(0);
      break;
    case 'hit':
      this.explosion.draw(ctx, this.x - this.width / 2, this.y - this.height / 2, this.width * 2, this.height * 2);
      if (this.explosion.currentFrame>=this.explosion.framesTotal-1 ) {
        this.state = 'destroy';
      }
      break;
    case 'destroy':
      ctx.fillStyle = 'black';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      break;
  }
};