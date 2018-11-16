
function Phrase (x,y,size,r,g,b) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.r = r;
  this.g = g;
  this.b = b;
  this.shown = true;
}

Phrase.prototype.display = function() {
  push();
  translate(this.x-width/2,this.y-height/2,0);
  noStroke();
 fill(this.r,this.g,this.b);
  ellipsoid(this.size,this.size,this.size);
  pop();
}

Phrase.prototype.handleCollision = function(User) {
  var distance = dist(this.x,this.y,User.x,User.y);

  if (distance < this.size + User.size) {
    this.shown = false;

    console.log("hi");
  }
}
