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
  this.widthFrame = Math.floor(this.spriteSheetWidth / this.spriteSheetCols);
  this.heightFrame = Math.floor(this.spriteSheetHeight / this.spriteSheetRows);
  //Each row contains n frames and at the start we will display the first frame (assuming the index from 0).
  this.currentFrame = 0;
  this.framesTotal = frames;
  //Setting x and y coordinates of the canvas to get the single frame.
  this.srcX = 0;
  this.srcY = 0;
  this._timeStamp = Date.now();
}

Sprite.prototype.updateFrame = function () {

  this.currentFrame = ++this.currentFrame % this.framesTotal;
  this.srcX = this.currentFrame * this.widthFrame;
};

Sprite.prototype.selectStrip = function (strip) {
  this.strip = strip;
  this.srcY = strip * this.heightFrame;
};

Sprite.prototype.draw = function (ctx, x, y, width, height) {
  //if (this.currentFrame <= this.framesTotal) {
  this.updateFrame();
  ctx.clearRect(this.x, this.y, this.width, this.height);
  ctx.drawImage(this.image, this.srcX, this.srcY, this.widthFrame, this.heightFrame, x, y, width, height);
  //this.ctx.fillStyle = 'blue';
  //this.ctx.fillRect(this.obj.x, this.obj.y, this.obj.width, this.obj.height);
};

Sprite.prototype.drawStrip = function (ctx, x, y, width, height, strip) {
  this.selectStrip(strip);
  ctx.clearRect(this.x, this.y, this.width, this.height);
  ctx.drawImage(this.image, this.srcX, this.srcY, this.widthFrame, this.heightFrame, x, y, width, height);
};
