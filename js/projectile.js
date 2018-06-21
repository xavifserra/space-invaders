function Projectile(options) {
  this.type = options.type;
  this.color= setup.missileColor;
  this.width =6;
  this.height = 10;
  this.x = options.gunner.x + Math.floor(options.gunner.width / 2) - this.width/2;
  this.y = options.gunner.y ;   //paint the shot in the middle of the player 
}

Projectile.prototype.trajectory = function () {
  switch (this.type) {
    case 'missile':
        this.y -= setup.velocityMissile;
      break;
    case 'bomb':
        this.y += setup.velocityBomb;
      break;
  }
};
