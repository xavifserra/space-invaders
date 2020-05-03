function Projectile(options) {
  this.type = options.type
  this.width = 0
  this.height = 0
  this.x = options.gunner.x + Math.floor(options.gunner.width / 2) - this.width / 2
  this.y = options.gunner.y // paint the shot in the middle of the player
  this.velocity = 0
  this.sprite = undefined

  switch (this.type) {
    case 'missile':
      this.color = weapons.missile.color
      this.width = weapons.missile.width
      this.height = weapons.missile.height
      this.sprite = new Sprite(weapons.missile.image, 1, 4, 97, 25, 4)
      break
    case 'bomb':
      this.color = weapons.bomb.color
      this.width = weapons.bomb.width
      this.height = weapons.bomb.height
      this.points = weapons.bomb.points
      this.sprite = new Sprite(weapons.bomb.image, 1, 4, 96, 25, 4)
      break
    default:
      break
  }
}

Projectile.prototype.trajectory = function () {
  this.type === 'missile' ? this.y -= this.velocity : this.y += this.velocity
}

Projectile.prototype.draw = function (ctx) {
  this.sprite.draw(ctx, this.x, this.y, this.width, this.height)
}
