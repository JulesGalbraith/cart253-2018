/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarWidth;
var avatarHeight;
var avatarSize;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize;
// How much bigger the enemy circle gets with each successful dodge
var enemyHeight;
var enemyWidth;
var enemySizeIncrease = 1.3;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

//position of CELEBRATORY PUTIN
var partyPutinX = 50;
var partyPutinY = 50;
var partyPutinAngle = 0;

//position of ACCUSATORY putin
var putinPointsX;
var putinPointsY;

//position of PAUL MANAFORT
var manafortX;
var manafortY;

//position of MICHAEL COHEN
var cohenX;
var cohenY;

//position of STORMY DANIELS
var stormyX;
var stormyY = 0;

// How many dodges the player has made
var dodges = 0;

// how many times the player has ABCDEFGHIJKLMNOPQRSTUVWXYZ
var losses = 0

//dodge tally location and font
var tallyX;
var tallyY;
var tallySize = 30
var tallyFont;

//preload()
//preloads the text and images necessary to bling out game
function preload() {
tallyFont = loadFont("assets/fonts/Grad.TTF");
flowerFont =loadFont("assets/fonts/Floralia.ttf");
avatar = loadImage("assets/images/theDonald.png");
enemy =loadImage("assets/images/mueller.png");
golf =loadImage("assets/images/golf.png");
putinPoints =loadImage("assets/images/putinPoints.png")
stormy =loadImage("assets/images/stormy.png");
manafort =loadImage("assets/images/manafort.png");
cohen =loadImage("assets/images/michaelCohen.png");
partyPutin =loadImage("assets/images/partyPutin.png");
}
// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);
  imageMode(CENTER)

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);


  //assigns a value to sizes- height and width- of avatar and enemy
  avatarSize =(avatar.width *0.06);
  avatarWidth =(avatar.height*0.06);
  avatarHeight =(avatar.width*0.06);
  enemySize =(enemy.width*0.08);
  enemyHeight = (enemy.height*0.06);
  enemyWidth = (enemy.width*0.06);

  //creates dodge tally in upper left hand side of createCanvas
  textSize(14);
  fill(207, 212, 252);
  tallyX = width - 10*(width/11);
  tallyY = height - 10*(height/11);
  textFont(tallyFont);
  text(dodges,tallyX,tallyY);
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A golf course
image (golf,height/2,width/2);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;


  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU'RE FIRED "+losses);
   //logs 1 loss
   losses = losses + 1
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemyHeight = (enemy.height*0.06);
    enemyWidth = (enemy.width*0.06);
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    //resets avatar's size and speed
    avatarWidth =(avatar.height*0.06);
    avatarHeight =(avatar.width*0.06);
    avatarSpeed =10
    // Reset the dodge counter
    dodges = 0;
    //resets michael cohen offscreen
    cohenX = 2*height;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU'RE FIRED "+losses);
    losses = losses + 1;
    enemyX = 0;
    enemyY = random(0,height);
    enemyHeight = (enemy.height*0.06);
    enemyWidth = (enemy.width*0.06);
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    avatarWidth =(avatar.height*0.06);
    avatarHeight =(avatar.width*0.06);
    avatarSpeed =10;
    dodges = 0;
    cohenX = 2*height;
    //resets stormy daniels offscreen
    stormyY = 0 - stormy.height/2
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    //resets loss counter
    losses = 0;
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemyHeight = enemyHeight + enemySizeIncrease;
    enemyWidth = enemyWidth + enemySizeIncrease;

    //alters avatar size and speed by a random amount
    avatarHeight = avatarHeight*random(0.4,1.5);
    avatarWidth = avatarWidth*random(0.4,1.5);
    avatarSpeed = random(1.5,15);
  }

  //makes a celebratory putin appear and rotate around the centre if Trump keeps dodging successfully
  if (dodges > 5) {
  angleMode(DEGREES);
  push();
  partyPutinAngle = partyPutinAngle + 0.5;
  translate(width/2,height/2);
    rotate(partyPutinAngle);
    image(partyPutin,partyPutinX,partyPutinY);
    pop();
  }

// makes putin point accusingly + stick to enemy avatar if trump
//fails to dodge too frequently i.e. if
//the number of losses is higher than the number of dodges
  if (losses > dodges && enemyY > height/2) {
    putinPointsX = enemyX;
    putinPointsY = enemyY - 50;
    image(putinPoints,putinPointsX,putinPointsY);
  }
  else if (losses > dodges && enemyY < height/2) {
    putinPointsX = enemyX;
    putinPointsY = enemyY + 50;
    image(putinPoints,putinPointsX,putinPointsY)
 }
    //makes paul manafort appear in bottom right hand corner if trump scrapes the
    //bottom
    if (avatarY > 2*(height/3)) {
    manafortX = 3*(width/4);
    manafortY = 3*(height/4);
    image(manafort,manafortX,manafortY);

    }

  // display dodge tally
  textSize(tallySize);
  fill(207, 212, 252);
  tallyX = width - 6*(width/11);
  tallyY = height - 10*(height/11);
  textFont(tallyFont);
  text(dodges+ " DODGES! NO COLLUSION!",tallyX,tallyY);
  push()
  textFont(flowerFont);
  text("J",tallyX-30,tallyY);
  text("G",tallyX+235,tallyY);
  pop()

  //displays basic instructions
text ("Press Any Key or Hold Down Mouse",1*(width/4),3.5*(height/4),);


  // Display the current number of successful dodges in the console
  console.log(dodges);

  // The player is DONALD TRUMP
  image(avatar,avatarX,avatarY,avatarWidth,avatarHeight);

  // The enemy is ROBERT MUELLER
  image(enemy,enemyX,enemyY,enemyHeight,enemyWidth);

//stormy Daniels appears
  image(stormy,stormyX,stormyY);

  //michael cohen appears
  image(cohen,cohenX,cohenY);

 }

//at mkeytyped, sends stormy daniels down the screen at avatar x
function keyTyped() {
  stormyX = avatarX;
  stormyY = stormyY + 10;
  console.log("key was typed");

}

//  cohen appear to follow the mouse around
function mouseDragged()  {
  cohenX = mouseX;
  cohenY = mouseY;
  console.log("mousepressed");
}
