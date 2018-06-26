function Sprite(img, rows, cols, spritesSheetWith, spritesSheetHeight, frames) {
  this.image = new Image();
  this.image.src = img;
  //  Rows and cols in the current spritesheet.
  this.spriteSheetCols = cols;
  this.spriteSheetRows = rows;
  // //Setting the width and height of our spritesheet.
  this.spriteSheetWidth = spritesSheetWith;
  this.spriteSheetHeight = spritesSheetHeight;
  //To get the width of a single sprite we divided the width of sprite with the number of cols.
  this.widthFrame = this.spriteSheetWidth / this.spriteSheetCols;
  this.heightFrame = this.spriteSheetHeight / this.spriteSheetRows;
  //Each row contains n frames and at the start we will display the first frame (assuming the index from 0).
  this.currentFrame = 0;
  this.frameCount = frames;
  //Setting x and y coordinates of the canvas to get the single frame.
  this.srcX = 0;
  this.srcY = 0;
}

Sprite.prototype.updateFrame = function (strip) {

  this.strip = strip;
  this.currentFrame = ++this.currentFrame % this.frameCount;
  this.srcX = this.currentFrame * this.widthFrame;
  //Define the rows by movement.
  this.srcY = strip * this.heightFrame;
};

// Sprite.prototype.draw = function () {
//   //this.requestAnimationFrame(this.draw().bind(this));
//   this.ctx.clearRect(x, y, width, height);
//   this.updateFrame(strip);
//   this.ctx.drawImage(this.character, this.srcX, this.srcY, this.widthFrame, this.heightFrame, this.x, this.y, this.width, this.height);
// };