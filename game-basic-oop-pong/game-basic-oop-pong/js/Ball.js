


function Ball(x,y,size,vx,vy,speed) {
  this.size = size;
  this.speed = speed;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;

}

Ball.prototype.update = function () {
  this.x += this.vx;
  this.y += this.vy;

  if (this.y < 0 || this.y > height) {
    this.vy = -this.vy;
  }
  if (this.x < 0 || this.x > width) {
    this.x = width/2;
    this.y = height/2;
  }
}

Ball.prototype.display = function () {
  rect(this.x,this.y,this.size,this.size)
}
Ball.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
}
