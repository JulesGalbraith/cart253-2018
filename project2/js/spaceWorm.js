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

  var distance = dist(this.x,this.y,paddle.x,paddle.y);

  if(distance < this.l + paddle.size) {
    paddle.size - 5;
    paddle.score-1;
  }
}
