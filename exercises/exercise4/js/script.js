// Pong
// by Pippin Barr
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.

// Game colors
//var bgColor = map(noise(0.2),0,1,0,255);
/////////new///////////
//deleted fgColor

// BALL

// Basic definition of a ball object with its key properties of
// position, size, velocity, and speed
var ball = {
  x: 0,
  y: 0,
  size: 40,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;

// LEFT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 7,
  upKeyCode: 87, // The key code for W
  downKeyCode: 83, // The key code for S
  ////////new//////////////
  //changed paddle speed above
  //checks the left paddle's score
  rebounds: 0,
  //colour values, original and mutable
  origR:0,
  origG:30,
  origB:120,
  r: 0,
  g: 20,
  b: 120
  /////end///////////
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 7,
  upKeyCode: 38, // The key code for the UP ARROW
  downKeyCode: 40, // The key code for the DOWN ARROW
  ////////new//////////////
  //changed paddle speed above
  //checks the right paddle's score
  rebounds: 0,
  //colour values
  origR: 80,
  origG: 100,
  origB: 50,
  r: 60,
  g: 100,
  b: 50
  /////end///////////
}

// A variable to hold the beep sound we will play on bouncing
var beepSFX;
//////////new//////////////
//variables to check which side the ball went offscreen through, and to
//tally the score
var side;
var leftPoints = 0;
var rightPoints = 0;

// a variable naming the font used
var ballFont;
var beep;
var boop;

// a variable holding the time at which the background's noise function is sampled
var bgColour;
var backgroundT = 0;

//variable tracking gameOver

var gameLost = false;


// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  ballFont = loadFont("assets/fonts/virgo.ttf");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640,480);
  ////////////new//////////////
  //i have a high-density pixel display, i'm optimizing
  pixelDensity(1);
  //////////////end//////////////
  rectMode(CENTER);
  noStroke();

  setupPaddles();
  setupBall();
}

// setupPaddles()
//
// Sets the positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle
  /////////////new////////////
  //added push/pop and new fill values for each paddle
  //////end////////////////

  leftPaddle.x = paddleInset;
  leftPaddle.y = height/2;

  // Initialise the right paddle

  rightPaddle.x = width - paddleInset;
  rightPaddle.y = height/2;

}

// setupBall()
//
// Sets the position and velocity of the ball
function setupBall() {
  ball.x = width/2;
  ball.y = height/2;
  ball.vx = ball.speed;
  ball.vy = ball.speed;
}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  ///////////////new//////////////////
  //the background shifts in a greyscale according to the noise function
  setupBackground();

  // Handle input
  // Notice how we're using the SAME FUNCTION to handle the input
  // for the two paddles!
  handleInput(leftPaddle);
  handleInput(rightPaddle);

  // Update positions of all objects
  // Notice how we're using the SAME FUNCTION to handle the input
  // for all three objects!
  updatePosition(leftPaddle);
  updatePosition(rightPaddle);
  updatePosition(ball);

  // Handle collisions
  handleBallWallCollision();
  handleBallPaddleCollision(leftPaddle);
  handleBallPaddleCollision(rightPaddle);

  // Handle the ball going off screen
  handleBallOffScreen();

  // Display the paddles and ball
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();

  gameOver();
}


// handleInput(paddle)
//
// Updates the paddle's velocity based on whether one of its movement
// keys are pressed or not.
// Takes one parameter: the paddle to handle.
function handleInput(paddle) {

  // Set the velocity based on whether one or neither of the keys is pressed

  // NOTE how we can change properties in the object, like .vy and they will
  // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
  // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

  // UNLIKE most variables passed into functions, which just pass their VALUE,
  // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
  // gets passed, so we can change its properties etc.

  // Check whether the upKeyCode is being pressed
  // NOTE how this relies on the paddle passed as a parameter having the
  // property .upKey
  if (keyIsDown(paddle.upKeyCode)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the .downKeyCode is being pressed
  else if (keyIsDown(paddle.downKeyCode)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePosition(object)
//
// Sets the position of the object passed in based on its velocity
// Takes one parameter: the object to update, which will be a paddle or a ball
//
// NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
// properties, which is true of both the two paddles and the ball
function updatePosition(object) {
  object.x += object.vx;
  object.y += object.vy;

  ////////////////new/////////////
  //wraps paddles in case they go off top or bottom of screen
  if (object.y - object.h/2 < 0) {
   object.y += height
  }
  else if (object.y + object.h/2 > height) {
    object.y -= height
   }
  }


// handleBallWallCollision()
//
// Checks if the ball has overlapped the upper or lower 'wall' (edge of the screen)
// and is so reverses its vy
function handleBallWallCollision() {

  // Calculate edges of ball for clearer if statement below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Check for ball colliding with top and bottom
  if (ballTop < 0 || ballBottom > height) {
    // If it touched the top or bottom, reverse its vy
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// handleBallPaddleCollision(paddle)
//
// Checks if the ball overlaps the specified paddle and if so
// reverses the ball's vx so it bounces
function handleBallPaddleCollision(paddle) {

  // Calculate edges of ball for clearer if statements below
  var ballTop = ball.y - ball.size/2;
  var ballBottom = ball.y + ball.size/2;
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = paddle.y - paddle.h/2;
  var paddleBottom = paddle.y + paddle.h/2;
  var paddleLeft = paddle.x - paddle.w/2;
  var paddleRight = paddle.x + paddle.w/2;

  // First check it is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle so reverse its vx
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();

      updatePaddle();
    }
  }
}

// handleBallOffScreen()
//
// Checks if the ball has gone off screen to the left or right
// and moves it back to the centre if so
function handleBallOffScreen() {

  // Calculate edges of ball for clearer if statement below
  var ballLeft = ball.x - ball.size/2;
  var ballRight = ball.x + ball.size/2;

  /////////////////new///////////////////
  //switched around ballLeft and ballRight below because it seems to me that
  //it's ballLeft that would end up smaller than the origin and ballRight
  //that would end up further than the width...
  ///////////end//////////////////

  // Check for ball going off the sides
  if (ballLeft < 0 || ballRight > width) {
    // If it went off either side, reset it to the centre
    ball.x = width/2;
    ball.y = height/2;
    // NOTE that we don't change its velocity here so it just
    // carries on moving with the same velocity after its
    // position is reset.
    // This is where we would count points etc!

    /////////////new////////////////
    //resets paddle score and original colour value, sends ball to the opposite
    //paddle it missed at a random y velocity
  if (ballLeft < 0) {
    side = 1;
    resetPaddle(leftPaddle);
    resetBall();
    rightPoints += 1;
  }
  else if (ballRight > width) {
    side = -1
    resetPaddle(rightPaddle);
    resetBall();
    leftPoints +=1;
  }
  }
  }


// displayBall()
//
// Draws ball on screen based on its properties
function displayBall() {
/////////////////new/////////////////
//turns the ball into a word that reads 'beep' in one direction and 'boop' in
//the other
textFont(ballFont);
textSize(ball.size);
textAlign(CENTER);
push();
fill(255,0,50);
  if (ball.vx > 0) {
  beep = text("beep",ball.x,ball.y,ball.size,ball.size);
}
else if (ball.vx < 0) {
  boop = text("boop",ball.x,ball.y,ball.size,ball.size)
}
pop();
}

// displayPaddle(paddle)
//
// Draws the specified paddle on screen based on its properties
function displayPaddle(paddle) {
  //////////////new/////////////
  //added new fill vallue that can be particularized to a paddle
  push();
  fill(paddle.r,paddle.g,paddle.b);
  //////////////end//////////////////
  rect(paddle.x,paddle.y,paddle.w,paddle.h);
  pop();
}


///////////new//////////////
//alters colour value of paddle if a point is scored
function updatePaddle() {

     if (ball.x > width/2) {
        rightPaddle.rebounds += 1;
        rightPaddle.g += 20;
        rightPaddle.b += 20;

        }
      else if (ball.x < width/2) {
      leftPaddle.rebounds += 1;
       leftPaddle.r +=20;
       leftPaddle.b += 20;

      }

      if (rightPaddle.b > 255) {
        rightPaddle.b = 0;
        }
      else if (leftPaddle.r > 255) {
        leftPaddle.r = 0;
        }

}
//resets colour value and score of paddle, and velocity of ball
function resetPaddle(paddle) {
  paddle.rebounds = 0;
  paddle.r = paddle.origR;
  paddle.g = paddle.origG;
  paddle.b = paddle.origB;
}

//resets ball
function resetBall() {
  ball.vx = side*ball.speed;
  ball.vy = random(-10,10);

}

//sets up background colour to change according to a noise value

function setupBackground() {

  bgColour = (map(noise(backgroundT),0,1,0,255));
  background(bgColour);
  backgroundT += 0.01

  if (bgColour > 255) {
    bgColour -= 100;
  }
}

//sets the condition for game over- if either side loses 10 times- and sets
//a game over screen

 function gameOver() {


   if (leftPoints > 1 || rightPoints > 1) {

     gameLost = true;

     push();
     background(0);
     textSize(60);
     textFont(ballFont);
     fill(random(200,255),15,random(10,50));

     text("GAME OVER :C",width/2, height/2);
     pop();

     push();
     textSize(20);
     textFont(ballFont);
     fill(random(200,255),15,random(10,50));
     text("press enter to beeoopboopbeep again",width/2,300);
     pop();
   }
 }

 function keyPressed() {
   if (keyCode === ENTER && gameLost){
     location.reload();
   }
 }



/////////////////////end/////////////////////
