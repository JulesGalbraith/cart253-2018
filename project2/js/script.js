//Elon and the Restlessness of the Interplanetary Migrant
// by Pippin Barr and Jules Galbraith
//
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

/////////new/////////////////
// Variables containing the images used as textures on various objects
var elon;
var mars;
var earth;
var starField;
var dollars;
var bitcoin;
var riyal;

//creates coordinates for starry welcome screen background
var numStars = 300;
var starX;
var starY;

//arrays tracking earth's and mars' respective lives
var earthLives = [];
var marsLives = [];

//array containing objects representing currency for elon to collect
var currencyTypes= [];
var moneyObjects = [];
var numMoneyObjs = 30;

//variable containing an object which will collide with the planets, to their detriment
var aBoringWorm;

var welcomeText;

//creates truth-functonal variables for welcome, game, and end of game screens
var welcomeScreen = true;
var inGame = false;
var gameOver = false;

////////new///////////////////
//loads images for ball avatar, as well as textures for earth and mars ellipsoids
function preload () {
  //ball avatar
  elon = loadImage("assets/images/elon.png");
  //paddle textures
  earthTex = loadImage("assets/images/earthTexture.jpg");
  marsTex = loadImage("assets/images/marsTexture.jpg");
  //game background
  starField = loadImage("assets/images/starryBackground.jpg");
  //fonts
  titleFont = loadFont("assets/fonts/Merkur.otf");
  infoFont = loadFont("assets/fonts/ElectroShackle.otf");
  //loads images of currency for elon to collect
  dollars =loadImage("assets/images/50DollarBill.JPG");
  bitcoin = loadImage("assets/images/bitcoin.png");
  riyal = loadImage("assets/images/saudiRiyal.jpg");

}

//
// Creates the ball and paddles
function setup() {
  //////////new/////////////
  //canvas is the size of the window, and 3d is enabled
  createCanvas(windowWidth,windowHeight,WEBGL);
  background(0);
  // Let elon musk be our ball
  elon = new Ball(width/2,height/2,5,5,elon,45,15);
  // Create earth on the left, with S and W as controls
  earth = new Paddle(85,height/2,65,10,83,87,earthTex);
  // Create mars on the right, with UP and DOWN as controls
  mars = new Paddle(width-85,height/2,65,10,DOWN_ARROW,UP_ARROW,marsTex);

  /////////new////////
  //for loops creating balls represening earth's and mars' lLives
  for (i = 0; i < earth.score; i++) {
    earthLives.push(new Ball(20 + 30*i,30,0,0,earthTex,10,0));
  }
  for (i = 0; i < mars.score; i++) {
    marsLives.push(new Ball((width-20) - 30*i,30,0,0,marsTex,10,0));
  }

  //for loops creating money for elon musk to collect
  currencyTypes = [dollars,bitcoin,riyal];
  for (i = 0; i < numMoneyObjs; i ++) {
    var moneyIndex = floor(random(0,currencyTypes.length));
    moneyObjects.push(new Investment(width/2,100*i,50,random(5,10),random(-5,5),random(-5,5),currencyTypes[moneyIndex]));
  }

  //creates a space worm/ metaphor for resource extraction that damages whichever planet it
  //runs into, decreasing speed and removing a life
   aBoringWorm = new Worm(width/2,height/2,10,100,20);

//creates explanatory text on welcome screen
welcomeText = createGraphics(1500,2000);
welcomeText.textAlign(CENTER);
push();
welcomeText.textSize(100);
welcomeText.textFont(titleFont);
welcomeText.fill(252, 255, 127);
welcomeText.text("ELON: INTERPLANETARY MIGRANT",width/2,height/2);
welcomeText.text("PRESS SPACE TO BEGIN",width/2, height/2+ 700);
pop();

push();
welcomeText.textSize(50);
welcomeText.textFont(infoFont);
welcomeText.fill(255);
welcomeText.text("Elon Musk is hopping from Earth to Mars", width/2, height/2 + 150);
welcomeText.text("unfortunately, neither planet", width/2, height/2 + 200);
welcomeText.text("wishes to be responible for him", width/2, height/2 + 250);
welcomeText.text("S/W control Earth, UP/DOWN control Mars",width/2, height/2 + 500);
pop();
}

// draw()
// Handles input, updates all the elements, checks for collisions
// and displays everything.

function draw() {
  /////////////new////////////////
  //resets origin to top left hand corner
  translate(-width/2,-height/2);
  background(0);

//creates a starry field for the welcome screen
if (welcomeScreen) {

  for (i=0; i < numStars; i++) {
    starX = random(width);
    starY = random(height);

    push();
    fill(random(150,255));
    strokeWeight(1);
    stroke(255);
    line(starX,starY,starX+1,starY);
    pop();
    }

    push();
    translate(width/2,height*0.6);
    fill(255,0,0);
    texture(welcomeText);
    plane(1000,1000);
    pop();
}

//deploys if space bar is pressed
 else if (inGame) {
//background is a static starry field
push();
 translate(width/2,height/2);
   texture(starField);
   plane(width,height);
pop();

//handles gameplay
  earth.handleInput();
  mars.handleInput();

  elon.update();
  earth.update();
  mars.update();
  trackScore();

  if (elon.isOffScreen()) {
    elon.reset();
  }

  elon.handleCollision(earth);
  elon.handleCollision(mars);

 elon.display();
 earth.display();
 mars.display();
 /////////new////////////
 //displays earth and mars' lives
 for (i = 0; i < earthLives.length; i++) {
 earthLives[i].display();
  }
  for (i = 0; i < marsLives.length; i++) {
  marsLives[i].display();
   }

  for (i = 0; i < moneyObjects.length; i ++) {

  if (moneyObjects[i].isDisplayed) {
  moneyObjects[i].display();
      }
    moneyObjects[i].handleCollision(elon);
    moneyObjects[i].update();
    }

   aBoringWorm.update();
   aBoringWorm.handleCollision(earth);
   aBoringWorm.handleCollision(mars);
   aBoringWorm.display();
 }

}
/////////new////////////////
// handles input on welcome and end of game screens
function keyReleased() {
  if (welcomeScreen && keyCode === 32) {
    inGame = true;
    welcomeScreen = false;
      }
  if (gameOver && keyCode === ENTER){
    inGame = true;
    welcomeScreen = false;
  }
}

//tracks score and removes one life from the losing side
function trackScore() {

  if (elon.isOffScreen() === -1) {
    earth.score -- ;
    earthLives.pop();
  }

if (elon.isOffScreen() === 1 ) {
  mars.score -- ;
  marsLives.pop();
    }
}

function gameOver() {
  
}

///////////////nrw/////////////
