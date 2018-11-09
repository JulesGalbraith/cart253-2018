
//drops money and other goodies around the canvas for the ball to collect, increasing its speed

function Investment(x,y,size,speed,vx,vy,image) {
this.x = x;
this.y = y;
this.size = size;
this.speed = speed;
this.vx = vx;
this.vy = vy;
this.image = image;
this.time = 0;
this.angle = 0;
this.isDisplayed = true;
}

//the money disperses loosesly according to a noise function
Investment.prototype.update = function() {
  this.vx = this.speed*noise(this.time);
  this.vy = this.speed*noise(this.time);

  this.x += random(-5,5)*this.vx;
  this.y += this.vy;

  this.time += 0.01

  //wraps the object to the screen

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

//if the elon runs into the money, he gains in speed. this function only applies
//to array elements that are displayed (as opposed to invisible)
Investment.prototype.handleCollision = function(ball) {

  if (this.isDisplayed){
  var distanceMoneyToElon = dist(this.x,this.y,ball.x,ball.y);

  if (distanceMoneyToElon < this.size + ball.size) {
    ball.vx = ball.vx*1.045;
    this.isDisplayed = false;
  }

  }
}

//the money is displayed as a texture on a plane. it rotates very slightly, just for added flair. 

Investment.prototype.display = function() {
  push();
  translate(this.x,this.y,0);
  rotateY(this.angle);
  texture(this.image);
  plane(this.size,this.size,this.size);

  this.angle += 0.05;
  pop();
}
