//each guide is a pastel sphere
function Guide(x,y,size,r,g,b) {
this.x =x;
this.y = y;
this.size = size;
this.r =r;
this.g =g;
this.b =b;
this.angle = 0;
this.displayGuide = true;
this.createPhrase = true;
}

Guide.prototype.display = function() {
//object only displays if it has not been run into by the user. they appear as pastel balls,
//rotating a bit for the sake of ambiance

if (this.displayGuide) {

  push();
  fill(this.r,this.g,this.b)
  stroke(255);
  translate(this.x,this.y,0);
  rotateY(this.angle);
  ellipsoid(this.size,this.size,this.size);
  pop();

  this.angle += 0.01;
  }
}

Guide.prototype.encounter = function(user){
//calculates distance between respective centres of guide and user
  var distance = dist(this.x,this.y,user.x,user.y);
//detects collision
  if (distance < (this.size/2 + user.size) && this.createPhrase === true) {

//tracks how many guides have been hit, triggering a corresponding phrase to appear
  if (guidesHit < displayedPhrases.length){
        guidesHit += 1;
      }
        phrase.push (new Phrase(width,random(0,height),5));
        phrase[guidesHit-1].createTextGraphic();
    //guide is no longer displayed
    this.displayGuide = false;
    //once this is called, no further phrases are created from this particular instance of collision
    this.createPhrase = false;

    thePop.play();
    thePop.setVolume(0.1);
  }
}
