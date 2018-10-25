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
var ball;
var leftPaddle;
var rightPaddle;

//////////new/////////////////
//variables for background colour
var bgColour;
var backgroundT = 0.01;

//tracks whether game is gameLost
var gameLost = false;


function preload() {
  wordFont = loadFont("assets/fonts/virgo.ttf");
}
// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,30,5);
  // Create the right paddle with UP and DOWN as controls
  ///////////////new/////////////////////
  //added new definitions representing colour values. I put them on a separate
  //line because the object was getting long- i don't know if this is
  //overly clunky?
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW,
                          60,100,50,0,20,100);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87,
                          0,30,120,20,0,120);
                          //////////////end////////////////
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {

  setupBackground();
  noStroke();

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {
///////new/////////////////////
//added if statement specifying which paddle to reset
    if (ball.x < 0){
    leftPaddle.reset();
    }
    if (ball.x + ball.size > width) {
    rightPaddle.reset();

    }

    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();

  gameOver();
}

function setupBackground() {

  push();
  bgColour = (map(noise(backgroundT),0,1,0,255));
  background(bgColour);
  backgroundT += 0.01

  if (bgColour > 255) {
    bgColour -= 100;
  }
  pop();
}


//conditions for game over and screen
function gameOver() {
   if (leftPaddle.losses > 10 || rightPaddle.losses > 10) {

     gameLost = true;

     textAlign(CENTER);

     push();
     background(0);
     textSize(60);
     textFont(wordFont);
     fill(random(200,255),15,random(10,50));
     text("GAME OVER :C",width/2, height/2);
     pop();

     push();
     textSize(20);
     textFont(wordFont);
     fill(random(200,255),15,random(10,50));
     text("press enter to beeoopboopbeep again",width/2,300);
     pop();
   }
 }
