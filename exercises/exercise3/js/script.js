/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;
//target's speed and velocity
var targetSpeed = 15
var targetV;

//the flickering square coordinates
var signX;
var signY;
var signWidth = 320;
var signHeight = 180;

//distance between centre of saucisse dog and centre of sign
var distDogSign;
// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 400;

// Keep track of whether they've won
var gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y,decoyImage1.width/2,decoyImage1.height/2);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,decoyImage2.width/2,decoyImage2.height/2);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,decoyImage3.width/2,decoyImage3.height/2);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,decoyImage4.width/2,decoyImage4.height/2);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,decoyImage5.width/2,decoyImage5.height/2);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,decoyImage6.width/2,decoyImage6.height/2);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,decoyImage7.width/2,decoyImage7.height/2);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,decoyImage8.width/2,decoyImage8.height/2);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,decoyImage9.width/2,decoyImage9.height/2);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,decoyImage10.width/2,decoyImage10.height/2);
    }
  }

  drawSign();

  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);

  distDogSign = dist(signX,signY,targetX,targetY);

  while (distDogSign < signWidth) {
    targetX = random(0,width);
    targetY = random(0,height);

    distDogSign = dist(signX,signY,targetX,targetY);
  }
  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY,targetImage.width/2,targetImage.height/2);

}

function draw() {
  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YOU WINNED!",width/2,height/2);
    noFill();
    stroke (random(150,200),255,random(150,200));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);

    //randomizes velocity of target images
    targetV = random (-15,15);
    //makes the sausage dog move frantically around the screen
    targetX += 30*sin(targetV*targetSpeed);
    targetY += targetV*targetSpeed;

    if (targetX + targetImage.width < 0) {
      targetX += width;
    }
    else if (targetX- targetImage.width > width) {
      targetX -= width;
    }

    if (targetY + targetImage.height < 0) {
      targetY += height;
    }
    else if (targetY - targetImage.height > height) {
      targetY -= height;
    }

    image(targetImage,targetX,targetY);

  }

  //doubles the target image for the sign
  //draws flickering red sign advertising the lost dog

drawSign();

}


//draws the sign advertising the lost saucisse DOG
function drawSign() {
signX = 4*width/5;
signY = height/5.5;
rectMode(CENTER);
strokeWeight(5);
stroke(220,100,50);
fill(255,random(40,150),115);
rect(signX,signY,signWidth,signHeight);
noStroke();
textSize(20);
textAlign(CENTER);
fill(random(150,250));
text("WHERE MR. SAUCISSE DOG??",signX,signY+(signHeight/2.2));
//puts double of targetimage at the centre of flickering sign
image(targetImage,signX,signY,1.5*targetImage.width,1.5*targetImage.height);
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
