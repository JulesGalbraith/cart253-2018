function Guide(x,y,size) {
this.x =x;
this.y = y;
this.size = size;
this.angle = 0;
this.displayGuide = true;
this.createPhrase = true;
}

Guide.prototype.display = function() {

if (this.displayGuide) {
  push();

  fill(255);
  stroke(150);
  strokeWeight(1);

  translate(this.x,this.y,0);
  angleMode(DEGREES);
  rotateY(this.angle);
  ellipsoid(this.size,this.size,this.size);
  this.angle += 50;

  pop();

  }
}

Guide.prototype.encounter = function(user){

  var distance = dist(this.x,this.y,user.x,user.y);

  if (distance < (this.size/2 + user.size/2) && this.createPhrase === true) {

    phrasesHit += 1;
    this.displayGuide = false;
    this.createPhrase = false;
  }
}
