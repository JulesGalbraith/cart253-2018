//
var lostSoul;

var clicks = 0;
var guidance = [];

function setup(){
  createCanvas(windowWidth,800,WEBGL);
  //translate(width/2,height/2);


//creates a lost user, floating in a void of sorts, seaching for direction
  lostSoul = new User(width/2,height/2,10,0,0,10,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW);

}

function draw(){
  background(random(0,50));

  lostSoul.handleInput();
  lostSoul.display();


  for (i = 0; i < clicks; i++) {

  guidance[i].handleCollision(lostSoul);


  if (guidance[i].shown === true) {
  guidance[i].display();
    }
  }
}

function mouseReleased() {

  clicks += 1;
  guidance.push (new Phrase(mouseX,mouseY,10,clicks*random(10,50),clicks*random(10,50),clicks*random(10,50)));
}
