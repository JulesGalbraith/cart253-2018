function Guide(x,y,vx,vy,size,speed) {
this.x =x;
this.y = y;
this.vx = vx;
this.vy = vy;
this.size = size;
this.speed = speed;
}

Guide.prototype.display () {
  push();
  fill(255);
  noStroke();
  ellipsoid(this.size,this.size,this.size);
}
