//Elon and the Restlessness of the Interplanetary Migrant
// by Pippin Barr and Jules Galbraith
//
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

/////////new/////////////////
// Variable to contain the objects representing elon musk, earth, and mars
var elon;
var mars;
var earth;
var starField;

//creates coordinates for starry welcome screen background
var numStars = 300;
var starX;
var starY;

//arrays tracking earth's and mars' respective lives
var earthLives[];
var marsLives[];

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
  titleFont = loadFont("assets/fonts/virgo.ttf");
  infoFont = loadFont("assets/fonts/ElectroShackle.otf");
}

//
// Creates the ball and paddles
function setup() {
  //////////new/////////////
  //canvas is the size of the window, and 3d is enabled
  createCanvas(1200,800,WEBGL);
  background(0);
  // Let elon musk be our ball
  elon = new Ball(width/2,height/2,5,5,elon,45,10);
  // Create earth on the left, with S and W as controls
  earth = new Paddle(85,height/2,65,10,83,87,earthTex);
  // Create mars on the right, with UP and DOWN as controls
  mars = new Paddle(width-85,height/2,65,10,DOWN_ARROW,UP_ARROW,marsTex);

  /////////new////////
  //for loops creating balls represening earth's and mars' marsLives
  for (i = 0; i < 11, i++){
    earthLives.push(new Ball(20*i,height-20,0,0,earthTex,10,0));
    marsLives.push(new Ball(width-20*1,height-20,0,0,marsTex,10,0))
  }


  //creates text as a graphic
  //push();
  //title = createGraphics(width,height);
  //title.textAlign(CENTER);
  //title.textSize(200);
  //title.fill(200);
//  title.textFont(titleFont);
//  title.text("ELON, INTERPLANETARY MIGRANT",width/2,height/20);
//  console.log("hi");
//  pop();
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

  if (elon.isOffScreen()) {
    elon.reset();
  }

  elon.handleCollision(earth);
  elon.handleCollision(mars);

 elon.display();
 earth.display();
 mars.display();
 /////////new////////////
 //displays earth and mars' mars
 for (i = 0; i < earthLives.length; i++) {
 earthLives.display();
  }
  for (i = 0; i < marsLives.length; i++) {
  marsLives.display();
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

function trackScore() {

  if (elon.ballIsOffscreen && "Earth loses!") {
    earth.score - 1;
  }
if (elon.ballIsOffscreen && "Mars loses!" )
  mars.score -1;
}

///////////////nrw/////////////
