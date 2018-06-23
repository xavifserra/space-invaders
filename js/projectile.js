function Projectile(options) {
  this.type = options.type;
  this.width = setup.missileWidth;
  this.height = setup.misileHeiht;
  this.x = options.gunner.x + Math.floor(options.gunner.width / 2) - this.width / 2;
  this.y = options.gunner.y; //paint the shot in the middle of the player 
  this.velocity=setup.missileVelocity;
  this.image=setup.misileImage;
}

Projectile.prototype.trajectory = function () {
  switch (this.type) {
    case 'missile':
      this.y -= this.velocity;
      this.color = setup.missileColor;
      this.width = setup.missileWidth;
      this.height = setup.misileHeiht;
      break;
    case 'bomb':
      this.y += this.velocity;
      this.color = setup.bombColor;
      this.width = setup.bombWidth;
      this.height = setup.bombHeiht;
      break;
  }
};