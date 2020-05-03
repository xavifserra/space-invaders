function Projectile(options) {
  this.type = options.type
  this.width = 0
  this.height = 0
  this.x = 0//options.gunner.x + Math.floor(options.gunner.width / 2) - this.width / 2
  this.y = 0//options.gunner.y // paint the shot in the middle of the player
  this.velocity = 0
  this.sprite = undefined

  switch (this.type) {
    case 'missile':
      this.color = weapons.missile.color
      this.width = weapons.missile.width
      this.height = weapons.missile.height
      this.velocity = weapons.missile.velocity
      this.sprite = new Sprite(weapons.missile.image, 1, 4, 97, 25, 4)
      this.x = options.gunner.x + Math.floor(options.gunner.width / 2) - this.width / 2
      this.y = options.gunner.y // paint the shot in the middle of the player
      break
      case 'bomb':
        this.color = weapons.bomb.color
        this.width = weapons.bomb.width
        this.height = weapons.bomb.height
        this.points = weapons.bomb.points
        this.velocity = weapons.bomb.velocity
        this.sprite = new Sprite(weapons.bomb.image, 1, 4, 96, 25, 4)
        this.x = options.gunner.x + Math.floor(options.gunner.width / 2) - this.width / 2
        this.y = options.gunner.y // paint the shot in the middle of the player
      break
    default:
      break
  }
}

Projectile.prototype.trajectory = function () {
  switch (this.type) {
    case 'missile':
      this.y -= this.velocity
      break
    case 'bomb':
      this.y += this.velocity
      break
    default:
      break
  }
}

Projectile.prototype.draw = function (ctx) {
  this.sprite.draw(ctx, this.x, this.y, this.width, this.height)
}
