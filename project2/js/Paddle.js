// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,size,speed,downKey,upKey,imgTexture) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.size = size;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.imgTexture = imgTexture;
  this.score = 11;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  ///////neww/////////////////
  //constrains y position according to the new origin point as dictated by webgl
  this.y = constrain(this.y,0-height,height-this.size);
}

// display()
//
// Draw the paddle as a 3d globe on the screen
Paddle.prototype.display = function() {
  push();
  translate(this.x,this.y,0);
  texture(this.imgTexture);
  ellipsoid(this.size,this.size,this.size);
  pop();
}
