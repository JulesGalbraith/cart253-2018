// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,r,g,b,
  rChange,gChange,bChange) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  ////////new//////////////
  //colour values, original and mutable
  this.origR = r;
  this.origG = g;
  this.origB = b;
  this.r = r;
  this.g = g;
  this.b = b;
  this.rChange = rChange;
  this.gChange = gChange;
  this.bChange = bChange;

//checks paddle's losses
  this.losses = 0;
  /////end///////////
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
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  //////////new/////////////////
  //added new colour values
  fill(this.r,this.g,this.b);
  ///////end/////////////////
  rect(this.x,this.y,this.w,this.h);
}
/////////////new///////////////
//affects colour value of paddle in the event of collision and returns the rgb value
//to 0 if it goes past 255
Paddle.prototype.handleCollision = function () {

  this.r += this.rChange;
  this.g += this.gChange;
  this.b += this.bChange;

  if (this.r > 255) {
        this.r = 0;
        }
  if (this.g > 255) {
        this.g = 0;
        }
  if (this.b > 255) {
      this.b = 0;
        }
}

//resets paddle if ball goes offscreen
Paddle.prototype.reset = function () {

  this.r = this.origR;
  this.g = this.origG;
  this.b = this.origB;

  this.losses += 1;

}
////////////////end/////////////////////////
