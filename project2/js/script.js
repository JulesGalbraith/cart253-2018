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

////////new///////////////////
//loads images for ball avatar, as well as textures for earth and mars ellipsoids
function preload () {
  elon = loadImage("assets/images/elon.png");
  earthTex = loadImage("assets/images/earthTexture.jpg");
  marsTex = loadImage("assets/images/marsTexture.jpg");
}

// setup()
//
// Creates the ball and paddles
function setup() {
  //////////new/////////////
  //canvas is the size of the window, and 3d is enabled
  createCanvas(1200,800,WEBGL);
  noStroke();
  // Let elon musk be our ball
  elon = new Ball(width/2,height/2,5,5,elon,30,5);
  // Create earth on the right, with UP and DOWN as controls
  earth = new Paddle(80,height/2,50,10,83,87,earthTex);
  // Create mars on the left, with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  mars = new Paddle(width-80,height/2,50,10,DOWN_ARROW,UP_ARROW,marsTex);
  console.log(mars.y, earth.y)
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  translate(-width/2,-height/2);
  background(0);

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
}
