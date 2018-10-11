/******************************************************

Game - The Hypochondriac's Dilemma
Pippin Barr, modified by Jules Galbraith

A simple game of immune resistance.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

/// images from googling various viruses on google images
//play music by Cloudface, from https://www.youtube.com/watch?v=6X5rrfhbNd0
//cough sound by Mike Koenig for soundbible.com

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
//player size decrease
var playerSizeDecrease = 0.4;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius;
var preyVX;
var preyVY;
var preyTX;
var preyTY;
var preySpeedInc = 2
var preyInitSpeed = 20;
var preyMaxSpeed = 35;
// Prey health
var preyHealth;
var preyMaxHealth = 255;

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

//determines size and location of a new enemy with the capacity to
//diminish player health
var symptomX;
var symptomY;
var symptomVX = 20;
var symptomVY = 10;
var symptomLength = 100;
var symptomHeight = 200;
var symptomAttacks = 0;

//opacity of the red warning flash
var warningTint = 0;
//sets a vertical offset between lines of text
var wordSize = 200;
var textY;
var textYOffset;
//image and font variable names
var gameOverFont;

//sound file names
var playMusic;
var cough;
var endMusic;

//preloads images, sounds and fonts
function preload() {
  //loads game over text
 gameOverFont = loadFont("assets/fonts/virgo.ttf");
 //loads player avatar
 player = loadImage("assets/images/whiteBloodCell.png");
//loads potential diagnoses/ preys
 blackDeath = loadImage("assets/images/blackDeath.png");
 commonCold = loadImage("assets/images/commonCold.png");
 eColi = loadImage("assets/images/ecoli.png");
 flu = loadImage("assets/images/flu.png");
 theClap = loadImage("assets/images/gohnorrhea.png");
 listeria = loadImage("assets/images/listeria.png");
 lyme = loadImage("assets/images/lyme.png");
 strep = loadImage("assets/images/strep.png");
 tuberculosis = loadImage("assets/images/strep.png");
 //loads background
 tissue = loadImage("assets/images/tissue.png");
 deadTissue = loadImage("assets/images/deadTissue.png");
 //loads sound files
 playMusic = new Audio("assets/sounds/CloudfaceBabyJ.mp3");
 cough = new Audio("assets/sounds/mKoenigCough.mp3")
 endMusic = new Audio("assets/sounds/ChopinNoctureClipped.mp3");

}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);

//chooses a random number to determine which prey will appear
  diagnosis = random();

  setupPrey();
  setupPlayer();
  //sets up symptom's initial position at a random y onn the x origin
  symptomX = 0;
  symptomY = random(0,height);

  //sets up play music
  playMusic.loop = true;
  playMusic.play();
}

// setupPrey()
//
// Initialises prey's position, velocity, noise value determining velocity, and health
function setupPrey() {

  preyX = random(0,width);
  preyY = random(0,height);
  preyVX = -preyInitSpeed;
  preyVY = preyInitSpeed;
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
  imageMode(CENTER);

  if (!gameOver) {
    image(tissue,width/2,height/2,width,height);

    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();

    floatingSymptom();

  }
  else {
    image(deadTissue,width/2,height/2,width,height);
    showGameOver();
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
setGameOver();
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {

//checks what the radius of the current prey is
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < (player.height/2) + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    //reduce the player's size
  player.width = player.width - playerSizeDecrease;
  player.height = player.height - playerSizeDecrease;
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);
    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      //increase prey speed
      preyVX = preyVX + preySpeedInc;
      preyVY = preyVY + preySpeedInc;
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
      diagnosis = random();
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
    // Use map() to convert from the 0-1 range of the noise function
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
push();
  imageMode(CENTER);
  tint(preyMaxHealth,preyHealth);

  if (diagnosis < 0.2) {
 image(blackDeath,preyX,preyY);
 preyRadius = blackDeath.width/2;
}
else if (diagnosis < 0.3) {
  image(commonCold,preyX,preyY);
  preyRadius = commonCold.width/2;
}
else if (diagnosis < 0.4) {
  image(eColi,preyX,preyY);
  preyRadius = eColi.width/2;
}
else if (diagnosis < 0.5) {
  image(flu,preyX,preyY);
  preyRadius = flu.width/2;
}
else if (diagnosis < 0.6 ) {
  image(theClap,preyX,preyY);
  preyRadius = theClap.width/2;
}
else if (diagnosis < 0.7) {
  image(listeria,preyX,preyY);
  preyRadius = listeria.width/2;
}
else if (diagnosis < 0.8 ) {
  image(lyme,preyX,preyY);
  preyRadius = lyme.width/2;
}
else if (diagnosis < 0.9) {
  image(strep,preyX,preyY);
  preyRadius = strep.width/2;
}
else if (diagnosis <1.0) {
  image(tuberculosis,preyX,preyY);
  preyRadius = tuberculosis.width/2;
}
pop();
}

// drawPlayer()
//
// Draw the player as white blood cell with an alpha based on health
function drawPlayer() {
 push();
  tint(playerMaxHealth,playerHealth);
  image(player,playerX,playerY);
  pop();
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
  text("You fought off " + preyEaten + " infections\n",width/2,(textY+textYOffset));
  text("but the antibiotics",width/2,textY+(1.5*textYOffset));
  text("lost efficacy", width/2,textY +(2.5*textYOffset));
  pop();
// displays reload intructions
  textSize(wordSize/2)
  text("PRESS ENTER TO RELOAD",width/2,2*(height/3));
}

//resets game if enter is pressed
function keyPressed() {

  console.log(keyCode);

  if ((gameOver) && keyCode === (ENTER)) {
location.reload();
 }

if (keyCode === 32) {
console.log(playMusic.paused);
if (playMusic.paused) {
  playMusic.play();
}
else {
  playMusic.pause();
}
}
}

//a strange new symptom appears to attack our player if it successfully
// wards off multiple infections. the immune system is weakened- i hope
//it's not lupus!

function floatingSymptom() {

if (preyEaten > 4) {

  symptomX += symptomVX;
  symptomY += symptomVY*sin(symptomX/250);

  // Screen wrapping
  if (symptomX < 0) {
    symptomX += width;
    symptomY = random(0,height);
  }
  else if (symptomX > width) {
    symptomX -= width;
    symptomY = random(0,height);
  }
  if (symptomY < 0) {
    symptomY += height;
  }
  else if (symptomY > height) {
    symptomY -= height;
  }

 push();
  strokeWeight(10);
  stroke(0,100);
  fill(62, 113, 247,100);
  ellipse(symptomX,symptomY,symptomHeight,symptomLength);
  fill(255,200);
  ellipse(symptomX + 20,symptomY,50,30);
  pop();
  //checks if player and new symptom are colliding
    var d = dist(playerX,playerY,symptomX,symptomY);
    if (d < (player.height/2) + symptomHeight/2) {
      playerX = playerX*-1;
      playerY = playerY*-1;
      symptomAttacks += 1;
      console.log(symptomAttacks, "ouch!");

      //plays a coughing noise if the symptom and player interact
      cough.play();
     }

   push();
// if the player collides with the new microbe 3 times, game over
   if (symptomAttacks > 10) {
     setGameOver();
  }
  }
}

function setGameOver() {
  gameOver = true
  playMusic.pause();
  endMusic.loop = true;
  endMusic.play();
}
