function Guide(x,y,size) {
this.x =x;
this.y = y;
this.size = size;
this.angle = 0;
this.displayGuide = true;
}

Guide.prototype.display = function() {

  push();

  fill(255);
  stroke(150);
  strokeWeight(0.5);

  translate(this.x,this.y,0);
  angleMode(DEGREES);
  rotateX(this.angle);
  ellipsoid(this.size,this.size,this.size);
  this.angle += 200;

  pop();
}
