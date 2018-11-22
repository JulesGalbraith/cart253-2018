function Phrase (x,y,vx,vy,size) {
  this.x = x;
  this.y = y;
  this.vx = vx;
}

Phrase.prototype.updatePosition = function () {
  this.vx -= 1;
  this.x = this.vx;
  this.y = random()
}

Phrase.prototype.display = function() {
  var w = windowWidth;
  var h = 200;
  var textGraphic = createGraphics(w,h);

  var displayedPhrase = [
    "lorem ipsum",
    "noli mi tangere",
    "humanity is engaged in a long game of bloody knuckles",
    "every thought activates a particular neural pathway; be aware of your thoughts, and which pathways are growing",
    "every habit is located in a cluster of co-dependent cells",
    "all bodies have something in common",
    "fracture and refraction are the true processes of self-formation",
    "the categories by which the social world is ordered produce entire worlds of unspeakability",
    "knowledge is creation is power- thinking is prior to being",
    "isaac newton slaps the roof of a car - the roof slaps back",
    "what is the nature of your fantasy/ imagination produces reality",
    "love/ compassion for its own sake is a direct challenge to neoliberalism",
    "self-satisfaction is a direct resistance to capitalism",
    "professionalism is a construct intented to devalue outsider knowledge"]

    push();
    textGraphic.fill(255);
    textGraphic.noStroke();
    textGraphic.textSize(50);

    textGraphic.text(displayedPhrase[random(i)],w/2,h/2);

    texture(textGraphic)
    translate(this.x,this.y,0);
    ellipsoid(windowWidth/2,200,20);

    pop();
}
