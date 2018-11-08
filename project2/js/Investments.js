//drops money and other goodies around the canvas for the ball to collect, increasing its speed

function Resources (x,y,size,speed,vx,vy,image) {
this.x = x;
this.y = y;
this.size = size;
this.speed = speed;
this.vx = vx;
this.vy = vy;
this.image = image;
this.time = 0;
}

Resources.prototype.update = function() {
  this.vx = speed*noise(this.time);
  this.vy = speed*noise(this.time);

  this.x += this.vx;
  this.y += this.y;

  this.time += 0.02
}

Resources.prototype.handleCollision = function(ball) {
  var distanceMoneyToElon = (this.x,this.y,ball.x,ball.y);

  if (distanceMoneyToElon < this.size + ball.size) {
    ball.speed + 5;
  }
}
