function Sprite(img, rows, cols, spritesSheetWith,spritesSheetHeight,frames, tracks) {
  this.image = new Image();
  this.image.src = img;
  //  Rows and cols in the current spritesheet.
  this.spriteRows = rows;
  this.spriteCols = cols;
  // //Setting the width and height of our spritesheet.
  this.spriteSheetWidth = spritesSheetWith;
  this.spriteSheetHeight = spritesSheetHeight;
  //Define the rows by movement.
  this.tracks = tracks;
  //To get the width of a single sprite we divided the width of sprite with the number of cols.
  // this.widthFrame = undefined;
  // this.heightFrame = undefined;
  this.widthFrame = this.spriteWidth / cols;
  this.heightFrame = this.spriteHeight / rows;
  //Each row contains n frames and at the start we will display the first frame (assuming the index from 0).
  this.currentFrame = 0;
  this.frameCount = frames;
  //Setting x and y coordinates of the canvas to get the single frame.
  this.srcX = 0;
  this.srcY = 0;
}

Sprite.prototype.updateFrame = function () {
  this.currentFrame = ++this.currentFrame % this.frameCount;
  this.srcX = this.currentFrame * this.widthFrame;
};

Sprite.prototype.draw=function(ctx,x,y){

  this.requestAnimationFrame(this.update);
};