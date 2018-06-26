function Sound(src) {

  this.init(src);
}

Sound.prototype.init = function (src) {
  this.sound = document.createElement("audio");
  this.sound.src=src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  
};

Sound.prototype.play = function () {
  this.sound.play();
};

Sound.prototype.stop = function () {
  this.sound.pause();
};