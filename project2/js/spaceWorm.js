//creates a worm wiggling around space that may or may not be a visual metaphor for
//the Boring company and a more abstract metaphor for the tech oligarchy's drive to
//forge ahead, extract and exploit with solipsistic disregard

function Worm (r,l,speed) {
  this.x = x;
  this.y = y;
  this.r = r;
  this. l = l;
  this.vx = vx;
  this.vy = vy;
  this.speed = speed;
  this.angle = 0;
}

Worm.prototype.update = function() {
  this.vy = this.speed*sin(this.angle);
  this.vx = this.speed*cos(this.angle);

  this.x += this.vx;
  this.y += this.vy;

  this.angle++
}

Worm.prototype.handleCollision = function(paddle) {

  var distanceWorm2Planet = dist(this.x,this.y,paddle.x,paddle.y);

  if(distanceWorm2Planet < this.l + paddle.size) {
    paddle.size - 5;
    paddle.score- 1;
  }
}

Worm.prototype.display = function() {
  push();
  translate(this.x,this.y);
  fill(random(200,255));
  cylinder(this.r,this.l,true,true);
  pop();

}
