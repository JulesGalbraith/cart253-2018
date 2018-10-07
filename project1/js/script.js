/******************************************************

Game - The Hypochondriac's Dilemma
Pippin Barr, modified by Jules Galbraith

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var player;
var playerX;
var playerY;
var playerVX = 0;
var playerVY = 0;
var playerAcceleration = 0.25;
var playerSpeed = 5;
var playerMaxSpeed = 15;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyVX;
var preyVY;
var preyTX;
var preyTY;
var preyMaxSpeed = 20;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;
var preyCount = 0;

//chooses the diagnosis, assigns names to various diseases
var diagnosis;
var blackDeath;
var commonCold;
var eColi;
var flu;
var theClap;
var listeria;
var lyme;
var strep;
var tuberculosis;


// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

//sets a vertical offset between lines of text
var wordSize = 200;
var textY;
var textYOffset;
//image and font variable names
var gameOverFont;


//preloads images, sounds and fonts
function preload() {
  //loads game over text
 gameOverFont = loadFont("assets/fonts/virgo.ttf");
 //loads player avatar
 player = loadImage("assets/images/whiteBloodCell.png");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(2500,2000);

  noStroke();

  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, noise value determining velocity, and health
function setupPrey() {
  preyX = random(0,width);
  preyY = random(0,height);
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(100,100,200);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
    keyPressed();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerSpeed;
  }
  else {
    playerVY = 0;
  }

  //accelerates the player and reduces its health more quickly if Shift is held
  if (keyIsDown(SHIFT)) {
    playerSpeed += playerAcceleration;
    playerSpeed += playerAcceleration;

    playerHealth = constrain(playerHealth - 1,0,playerMaxHealth);
    console.log(playerSpeed + " acceleration speed")
  }
}
// resets player speed and health diminution once shift is released
  function keyReleased() {
    if (keyCode === SHIFT);
    playerSpeed = 10;
    playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
    console.log (playerSpeed + " reset speed");
  }


// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()

// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < (player.height/2) + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    preyTX = random(0,500);
    preyTY = random(0,500);
    preyVX = map(noise(preyTX),0,1,-preyMaxSpeed,preyMaxSpeed);
    preyVY = map(noise(preyTY),0,1,-preyMaxSpeed,preyMaxSpeed);
  }

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
  preyTX += 0.01;
  preyTY =+ 0.01;
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {

  diagnosis = random(0,9)
  tint(preyMaxHealth, preyHealth)

  if (0 < diagnosis < 1) {
 image(blackDeath,preyX,preyY);
}

 else if (1 < diagnosis < 2) {
 image(blackDeath,preyX,preyY);
}
else if (2 < diagnosis < 3) {
  image(commonCold,preyX,preyY);
}
else if (3 < diagnosis < 4) {
  image(eColi,preyX,preyY);
}
else if (4 < diagnosis < 5) {
  image(flu,preyX,preyY);
}
else if ( 5 < diagnosis < 6 ) {
  image(theClap,preyX,preyY);
}
else if (6 < diagnosis < 7) {
  image(listeria,preyX,preyY);
}
else if (7 < diagnosis < 8 ) {
  image(lyme,preyX,preyY);
}
else if (8 < diagnosis < 9) {
  image (strep, preyX,preyY);
}
else if (9 < diagnosis <10) {
  image(tuberculosis,preyX,preyY);
}
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  tint(playerMaxHealth,playerHealth);
  image(player,playerX,playerY);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(wordSize);
  textAlign(CENTER,CENTER);
  textFont(gameOverFont);
  fill(random(200,255));

  textYOffset = wordSize*0.7;
  var gameOverText = "GAME OVER\n";
  textY = height/3;
  text (gameOverText,width/2,textY);
  push();
  fill(0);
  textSize(wordSize*0.5);
  text("You ate " + preyEaten + " prey\n",width/2,(textY+textYOffset));
  text("before you died.",width/2,textY+(1.5*textYOffset));
  pop();
// displays reload intructions
  //fill(random(200,255));
  textSize(wordSize/2)
  text("PRESS ENTER TO RELOAD",width/2,2*(height/3));
}

//resets game if enter is pressed
function keyPressed() {
  if ((gameOver) && keyCode === (ENTER)) {
location.reload();
console.log ("reset");
  }
}
