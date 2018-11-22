
//the length of each column of "guides", ie floating balls that dispense knowledge
//when the user runs into them
var numGuides = 5;
//indexes how many guides have been created so as to place them on the canvas
var guideIndex = 0;
//array holding the guide objects
var guides = [];
//variable containing the object controlled by the user
var user;
//array holding various objects upon which phrases will be drawn
var phrase = [];
//tracks how many guides have been run into
var guidesHit = 0;
//array holding phrases, randomly selected to appear as texture
var displayedPhrases = [
  "lorem ipsum",
  "noli mi tangere",
  "humanity is engaged in a long game of bloody knuckles",
  "don't activate those pathways",
  "every habit is located in a cluster of co-dependent cells",
  "all bodies have something in common",
  "fracture and refraction are the true processes of self-formation",
  "the order of the social world produces worlds of unspeakability",
  "knowledge is creation is power- thinking is prior to being",
  "isaac newton slaps the roof of a car - the roof slaps back",
  "what is the nature of your fantasy/ imagination produces reality",
  "compassion for its own sake is directly challenges neoliberalism",
  "self-satisfaction is a direct resistance to capitalism",
  "professionalism is a construct intented to devalue outsider knowledge"]


function setup(){

  createCanvas(windowWidth,windowHeight,WEBGL);
  background(0);

//creates user-controlled red ball; uses arrow keys to move
 user = new User(width/2,height/2,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,DOWN_ARROW);

//creates new phrase objects, to be displayed when the user collides with a guide
 for (i = 0; i < displayedPhrases.length; i++ ) {
   phrase.push (new Phrase(width,random(0,height),5));
   phrase[i].createTextGraphic();
 }
}

function draw(){
translate (-width/2,-height/2);
background(50);

//functions moving and displaying the user
user.moveUser();
user.displayUser();

//creates a new phrase each time a guide is hit. the phrase will scroll backwards across the screen
for (i = 0; i< guidesHit; i++) {
  phrase[i].display();
  phrase[i].updatePosition();
}
//displays a grid of white balls for the user to run into
displayGuides();
}

//creates four columns of white spheres that trigger scrolling nuggets of knowledge, advice or inanity when hit
function displayGuides() {

//spacing between spheres
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
