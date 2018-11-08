//creates a worm wiggling around space that may or may not be a visual metaphor for
//the Boring company and a more abstract metaphor for the tech oligarchy's drive to
//forge ahead, extract and exploit with solipsistic disregard

function Worm (x,y,r,l,speed) {
  this.x = x;
  this.y = y;
  this.r = r;
  this. l = l;
  this.vx = 1;
  this.vy = 1;
  this.speed = speed;
  this.angle = 0;
}

Worm.prototype.update = function() {
  this.vy = (this.speed*sin(30*PI*this.angle))/2;
  this.vx += 0.01;

  this.x += this.vx;
  this.y += this.vy;

  this.angle +=  0.001;

  //wraps the worm to the screen

  if (this.x < 0) {
    this.x += width;
  }
  if (this.x > width) {
    this.x -= width ;
  }
  if (this.y < 0) {
    this.y += height;
  }
  if (this.y > height) {
    this.y -= height;
  }
}

Worm.prototype.handleCollision = function(paddle) {

  var distanceWorm2Planet = dist(this.x,this.y,paddle.x,paddle.y);

  if(distanceWorm2Planet < this.l/2 + paddle.size) {
    paddle.size -= 1;
    paddle.score -= 1;
  }
}

Worm.prototype.display = function() {
  push();
  noStroke();
  translate(this.x,this.y);
  rotateZ(PI/2);
  fill(random(200,255));
  cylinder(this.r,this.l,24,1,true,true);
  pop();
}
