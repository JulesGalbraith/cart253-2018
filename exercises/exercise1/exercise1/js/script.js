// Exercise 1 - Moving pictures
// Pippin Barr with added movement from meee
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a SUNFLOWER
//note - this is a weird picture and i'm changing it to a sunflower -jules
var clownImage;
// The current position of the SUNFLOWER
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

//the image of a rat that moves from left to right
var fuzziRatImg;
//the current position of the fuzzi rat image
var fuzziRatImgX;
var fuzziRatImgY;

//the image that will move according to a sine wave
 var pceYo;
 //current position of the pcesign
 var pceYoX;
 var pceYoY;

//the image that will stick to the mouse
var voidRingSize = 60

//its current position
var voidRingX;
var voidRingY;

// preload()
//
// Load the images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/happy_sunflower.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  fuzziRatImg =loadImage("assets/images/Rattiboi.png");
  pceYo = loadImage ("assets/images/handz.png");

}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  //starts the rat image off screen, at the top third/ left of the createCanvas
 fuzziRatImgY = height/3;
 fuzziRatImgX = 0 - fuzziRatImg.width/2;

//starts the peace sign off screen, bottom third of the canvas to the left

 pceYoY = 2*(height/3);
 pceYoX = 0 - (pceYo.width/2);

noFill();
strokeWeight(10);
stroke(20,70);
voidRing = ellipse(voidRingX,voidRingY,voidRingSize)
 //

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Display the clown image
image(clownImage,clownImageX,clownImageY);

  //move the rat image across the canvas by increasing its x position
  fuzziRatImgX += 1;

// display the fuzzi rat!
image(fuzziRatImg,fuzziRatImgX,fuzziRatImgY);

//the peace sign goes waaaving across the canvas

pceYoY = (2*(height/3)) + (30*sin(pceYoX/15));
pceYoX += 1;

//display the sign of peace!
image(pceYo,pceYoX,pceYoY);

//display ellipse at mouse position- i know you said image (rather than image or shape),
//i'm sorry, i made a shape before i went back to look at the instructions!

voidRingX = mouseX;
voidRingY = mouseY;

ellipse(voidRingX,voidRingY,voidRingSize);

}
