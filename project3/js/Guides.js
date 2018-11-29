//each guide is a white sphere
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
//object only displays if it has not been run into by the user
if (this.displayGuide) {
  push();

  fill(this.r,this.g,this.b)
  stroke(255);

  translate(this.x,this.y,0);
  ellipsoid(this.size,this.size,this.size);
  pop();

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

  // for (i=0; i < guidesHit; i++) {
        phrase.push (new Phrase(width,random(0,height),5));
        phrase[guidesHit-1].createTextGraphic();
        //console.log("hi");
  //    }
    //guide is no longer displayed
    this.displayGuide = false;
    //once this is called, no further phrases are created from this particular instance of collision
    this.createPhrase = false;

    thePop.play();
  }
}
