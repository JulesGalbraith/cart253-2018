

var numGuides = 5;
var guideIndex = 0;
var guides = [];
var user;
var welcome;
var inGame = false;
var atWelcomeScreen = true;
var welcomePlane;
var welcomeFont;


function preload() {
  welcomeFont = loadFont("assets/fonts/BebasNeueLight.otf");
}

function setup(){

  createCanvas(windowWidth,windowHeight,WEBGL);
}


function draw(){

  if (atWelcomeScreen) {
    welcomeScreen();
  }
  if (inGame) {

  background(0);

  }

  keyPressed();
}


function welcomeScreen() {




  welcome = createGraphics(width,height);

  push();
  welcome.background(random(10,50));
  welcome.fill(255,230,221);
  welcome.textFont(welcomeFont);
  welcome.textSize(150);
  welcome.noStroke();
  welcome.textAlign(CENTER);
 welcome.text("it's okay to feel a little lost sometimes—",width/2,500);
 welcome.text("quasi-solicited advice is just a click away!",width/2, 700);
 welcome.text("is it welcome? is it wise?",width/2,1300);
 welcome.text("the only way to know is to run headlong into it",width/2,1500);
 welcome.text("press enter to begin",width/2,2000);
  pop();


  push();
  texture(welcome);
  welcomePlane = plane(windowWidth,windowHeight);
  pop();
}

function keyPressed() {
  if (keyCode === (ENTER) && atWelcomeScreen) {

    inGame = true;
    atWelcomeScreen = false;
    console.log("hi");
  }

  if (keyCode === SHIFT) {
    location.reload();
  }
}
