
//creates a red sphere, controlled by the user, that can interact with the white spheres
//already displayed on the canvas
function User(x,y,leftKey,rightKey,upKey,downKey) {
  this.x = x;
  this.y = y;
  this.size = 50;
  this.vx =width/2;
  this.vy = height/2;
  this.speed = 10;
  this.upKey = upKey;
  this.downKey = downKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;
}

//user is a red sphere
User.prototype.displayUser = function () {

  push();
  translate(this.x,this.y,0)
  noStroke();
  fill(255,0,0,150);
  ellipsoid(this.size,this.size,this.size);
  pop();
}

// user is controlled by the arrow keys; in the event of collision with a wall, the user stops
User.prototype.moveUser = function() {

  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
  if (keyIsDown(this.rightKey)){
    this.vx = this.speed;
  }
  else if (keyIsDown(this.leftKey)){
    this.vx = -this.speed;
  }
  else {
    this.vx = 0;
  }

//updates user location
  this.x += this.vx;
  this.y += this.vy;

//constrains user location to inside the canvas
  this.x = constrain(this.x,0,width);
  this.y = constrain(this.y,0,height);

}
