function Projectile(options) {
  this.type = options.type
  this.width = setup.missileWidth
  this.height = setup.misileHeiht
  this.x = options.gunner.x + Math.floor(options.gunner.width / 2) - this.width / 2
  this.y = options.gunner.y // paint the shot in the middle of the player
  this.velocity = setup.missileVelocity
  this.weapon = undefined

  switch (this.type) {
    case 'missile':
      this.weapon = new Sprite(setup.missileImage, 1, 4, 97, 25, 4)
      break
    case 'bomb':
      this.weapon = new Sprite(setup.bombImage, 1, 4, 96, 25, 4)
      break
    default:
      break
  }
}

Projectile.prototype.trajectory = function () {
  switch (this.type) {
    case 'missile':
      this.y -= this.velocity
      this.color = setup.missileColor
      this.width = setup.missileWidth
      this.height = setup.misileHeiht
      break
    case 'bomb':
      this.y += this.velocity
      this.color = setup.bombColor
      this.width = setup.bombWidth
      this.height = setup.bombHeiht
      this.points = setup.bombPoints
      break
    default:
      break
  }
}

Projectile.prototype.draw = function (ctx) {
  this.weapon.draw(ctx, this.x, this.y, this.width, this.height)
}
