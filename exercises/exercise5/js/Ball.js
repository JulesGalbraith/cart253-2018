// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  //////new///////////
  //determines the side to return
  this.side = 0;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  /////////////////new//////////////////////
  //split conjuctive statement into two if statements in order to check which
  //side the ball went off
  // Check for going off screen and reset if so
  if (this.x + this.size < 0) {
    this.side = 1;
    return true;
  }
  if (this.x + this.size > width) {
    this.side = -1;
    return true;
  }
  else {
    return false;
  }
}
//////////end///////////////

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  /////////////////new/////////////////
//turns the ball into a word that reads 'beep' in one direction and 'boop' in
//the other
textFont(wordFont);
textSize(this.size);
textAlign(CENTER);
push();
fill(255,0,50);
  if (this.vx > 0) {
  beep = text("beep",this.x,this.y,this.size,this.size);
}
else if (ball.vx < 0) {
  boop = text("boop",this.x,this.y,this.size,this.size)
}
pop();
}


// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
////////////new/////////////////
//calls the paddle's handle collision function
      paddle.handleCollision();
      /////////////////end//////////////////
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function() {
  this.x = width/2;
  this.y = height/2;
  //////new////////////
  //resets ball velocity to random value
  this.vx = this.side*this.speed;
  this.vy = random(-10,10);
}
///////////////end///////////////////
