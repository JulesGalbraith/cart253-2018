// Basic OO Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var elon;
var mars;
var earth;

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  noStroke();
  // Create a ball
  elon = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  earth = new Paddle(700,height/2,30,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  mars = new Paddle(100,height/2,10,30,83,87);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
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
