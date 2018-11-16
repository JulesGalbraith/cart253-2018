
function Phrase (x,y,size,r,g,b) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.r = r;
  this.g = g;
  this.b = b;
  this.shown = true;
  this.angle = 0;
}

//displays a slowly rotating sphere
Phrase.prototype.display = function() {

  push();
  translate(this.x-width/2,this.y-height/2,0);
  stroke(255);
  rotateY(this.angle);
  strokeWeight(0.1);
  fill(this.r,this.g,this.b);
  ellipsoid(this.size,this.size,this.size);
  pop();

  this.angle += 0.01;
}

//object disappears in the event it collides with the user
Phrase.prototype.handleCollision = function(User) {
  var distance = dist(this.x,this.y,User.x,User.y);

  if (distance < this.size + User.size) {
    this.shown = false;
  }
}
