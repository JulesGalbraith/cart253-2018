


function User (x,y,size,vx,vy,speed,upKey,downKey,leftKey,rightKey) {
  this.size = size;
  this.holeRadius = this.size/4;
  this.tubeSize = this.size - this.holeRadius;
  this.speed = speed;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.upKey = upKey;
  this.downKey = downKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;
  this.t = 0.1;
  this.angle = 0;
}

// user is controlled by the arrow keys; in the event of collision with a wall, the user will
//reverse direction
User.prototype.handleInput = function() {

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

console.log(this.x);
}

User.prototype.display = function() {

//users size varies according to a noise function
  this.size = this.size + map(noise(this.t),0,1,-1,1);
  this.size = constrain(this.size,10,50);

//user is a white torus who rotates in space
  push();
  fill(255);
  stroke(200);
  translate(this.x-width/2,this.y-height/2,0);
  rotateX(this.angle);
  rotateY(this.angle*2);
  torus(this.size,this.tubeSize)
  pop();

  this.t += 0.01;
  this.angle += 0.05;
}
