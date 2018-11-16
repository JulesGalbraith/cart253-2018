//variable designating the user
var lostSoul;

//variable tracking how many times the mouse has been clicked
var clicks = 0;
//array storing objects that appear when the mouse is clicked
var guidance = [];

function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);
//creates a lost user, floating in a void of sorts, seaching for direction
  lostSoul = new User(width/2,height/2,10,0,0,10,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW);

}

function draw(){
  background(random(0,50));

//displays the user in the middle of the canvas and updates its position according to keyboard input
  lostSoul.handleInput();
  lostSoul.display();

//displays new objects wherever the mouse is clicked
  for (i = 0; i < clicks; i++) {
  guidance[i].handleCollision(lostSoul);

//the object is displayed only if it has not collided with the user
  if (guidance[i].shown === true) {
  guidance[i].display();
    }
  }
}

//creates a new object at mouse location every time the mouse is clicked
function mouseReleased() {
  clicks += 1;
  guidance.push (new Phrase(mouseX,mouseY,10,clicks*random(10,50),clicks*random(10,50),clicks*random(10,50)));
}
