function Phrase (x,y,vx) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.size = 200;
  this.text = floor(random(displayedPhrases.length));
  this.textGraphic;
  this.w = windowWidth/2;
  this.h = this.size;
}

Phrase.prototype.updatePosition = function () {
 this.x -= this.vx;
}

Phrase.prototype.display = function() {

   push();
    translate(this.x,this.y,0);
    angleMode(DEGREES);
    texture(this.textGraphic)
   //rotateY(millis()/1);
    plane(20*this.size,this.size);
    pop();
}

Phrase.prototype.createTextGraphic = function () {

  this.textGraphic = createGraphics(this.w,this.h);

    push();
    //this.textGraphic.background(0,0,255,100);
    this.textGraphic.fill(255);
    this.textGraphic.noStroke();
    this.textGraphic.textSize(70);
    this.textGraphic.textAlign(CENTER);

    this.textGraphic.text(displayedPhrases[this.text],this.w/2,this.h/2);
    pop();
}
