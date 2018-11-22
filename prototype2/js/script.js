

var numGuides = 5;
var guideIndex = 0;
var guides = [];
var user;
var phrase = [];
var phrasesHit = 0;

var displayedPhrases = [
  "lorem ipsum",
  "noli mi tangere",
  "humanity is engaged in a long game of bloody knuckles",
  "don't activate those pathways",
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


function setup(){

  createCanvas(windowWidth,windowHeight,WEBGL);
  console.log(width,height);
  background(0);

 user = new User(width/2,height/2,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,DOWN_ARROW);

 for (i = 0; i < displayedPhrases.length; i++ ) {
   phrase.push (new Phrase(width,random(0,height),5));
   phrase[i].createTextGraphic();
 }
}

function draw(){
translate (-width/2,-height/2);
background(200);

user.moveUser();
user.displayUser();

for (i = 0; i< phrasesHit; i++) {
  phrase[i].display();
  phrase[i].updatePosition();
}

displayGuides();
}

function displayGuides() {

var offset = 400;
 var guideSize = 100

  for (i = 0 ; i < 5; i++) {
  guides.push(new Guide(width/5,(guideIndex+1)*offset,guideSize));
  guideIndex += 1;
  guides[i].display();
  guides[i].encounter(user);

  }

  for (i = 5 ; i < 10; i++) {
  guides.push(new Guide(2*width/5,(guideIndex-4)*offset,guideSize));
  guideIndex += 1;
  guides[i].display();
  guides[i].encounter(user);

  }

  for (i = 10; i < 15; i++) {
  guides.push(new Guide(3*width/5,(guideIndex-9)*offset,guideSize));
  guideIndex += 1;
  guides[i].display();
  guides[i].encounter(user);

  }

  for (i = 15; i < 20; i++) {
  guides.push(new Guide(4*width/5,(guideIndex-14)*offset,guideSize));
  guideIndex += 1;
  guides[i].display();
  guides[i].encounter(user);

  }

}
