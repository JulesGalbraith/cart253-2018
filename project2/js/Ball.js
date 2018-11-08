// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,imgTexture,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.imgTexture = imgTexture;
  this.rotateAngleX = 0;
  this.rotateAngleY = 0;
  this.rotateAngleZ = 0;
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
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > width) {
    return true;
  }
  else {
    return false;
  }
}

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  push();
  translate(this.x,this.y,)
  //rotates ball

    rotateX(this.rotateAngleX);
    rotateY(this.rotateAngleY);
    rotateZ(this.rotateAngleZ);

   this.rotateAngleX += 0.02;
    this.rotateAngleY += 0.03;
  //  this.rotateAngleZ += 0.006;
  texture(this.imgTexture);
  ellipsoid(this.size,this.size,this.size);
  pop();
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  var distance = dist(this.x,this.y,paddle.x,paddle.y);

//check if the distance between the centres of the spheres is less than the sum
//of their radii, detecting a collision
  if (distance < this.size + paddle.size/2) {
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
    }
}

// reset()
//
// Set position back to the middle of the screen
////////new/////////////
//changed origin point to reflect webgl format
Ball.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2 ;
}
