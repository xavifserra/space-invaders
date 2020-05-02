function Sound(src) {
  this.audio = undefined
  this.init(src)
}

Sound.prototype.init = function (src) {
  this.audio = new Audio(src)
}

Sound.prototype.play = function () {
  this.audio.play()
}

Sound.prototype.stop = function () {
  this.audio.pause()
}
