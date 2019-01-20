//creates a plane that text will display on
function Phrase (x,y,vx) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.size = 40;
  //randomizes choice between elements in the array
  this.text = floor(random(displayedPhrases.length));
  this.textGraphic;
  this.w = windowWidth/3;
  this.h = this.size;
}

// text will scroll left to right across screen
Phrase.prototype.updatePosition = function () {
 this.x -= this.vx;
}

//creates the plane upon which the graphic will appear
Phrase.prototype.display = function() {

   push();
    translate(this.x,this.y,0);
    texture(this.textGraphic)
    plane(20*this.size,this.size);
    pop();
}

//draws a 2d canvas that text can appear on; to be used as a texture on the plane
Phrase.prototype.createTextGraphic = function () {

//creates graphic according to size paramenters given in brackets
  this.textGraphic = createGraphics(this.w,2*this.h/3);

    push();
    this.textGraphic.background(0,0);
    this.textGraphic.fill(255);
    this.textGraphic.noStroke();
    this.textGraphic.textSize(15);
    this.textGraphic.textAlign(CENTER);

//chooses from a global array of phrases to display
    this.textGraphic.text(displayedPhrases[this.text],this.w/2,this.h/2);
    pop();
}
