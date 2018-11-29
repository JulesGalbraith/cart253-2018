

var guides = [];
var welcome;
var inGame = false;
var atWelcomeScreen = true;
var welcomePlane;
var welcomeFont;

//array holding various objects upon which phrases will be drawn
var phrase = [];
//tracks how many guides have been run into
var guidesHit = 0;
//array holding phrases, randomly selected to appear as texture
var displayedPhrases = [
  "lorem ipsum",
  "noli mi tangere",
  "humanity is engaged in a long game of bloody knuckles",
  "don't activate those pathways",
  "every habit is located in a cluster of co-dependent cells",
  "all bodies have something in common",
  "fracture and refraction are processes of self-formation",
  "the order of the social world produces unspeakable subjects",
  "knowledge is creation is power- thinking is prior to being",
  "isaac newton slaps the roof of a car - the roof slaps back",
  "what is the nature of your fantasy",
  "imagination produces reality",
  "compassion for its own sake challenges neoliberalism",
  "self-satisfaction is a direct resistance to capitalism",
  "professionalism is a construct devaluing outsider knowledge"]

//variable designating the user
var user;
//variable tracking how many times the mouse has been clicked
var clicks = 0;


function preload() {
  welcomeFont = loadFont("assets/fonts/BebasNeueLight.otf");
}

function setup(){

  createCanvas(windowWidth,windowHeight,WEBGL);
  //creates a lost user, floating in a void of sorts, seaching for direction
  user = new User(width/2,height/2,50,0,0,10,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW);

}


function draw(){

  if (atWelcomeScreen) {
    welcomeScreen();
    }

  if (inGame) {
    translate(-width/2,-height/2);

  background(0);
  //displays the user in the middle of the canvas and updates its position according to keyboard input
  user.handleInput();
  user.display();

//displays new objects wherever the mouse is clicked
  for (i = 0; i < clicks; i++) {
    guides[i].display();
    guides[i].encounter(user);
  }

  for (i=0; i < guidesHit; i++) {
    phrase[i].display();
    phrase[i].updatePosition();

    }
  }
}

//creates a new object at mouse location every time the mouse is clicked
function mouseReleased() {
  clicks += 1;
  guides.push (new Guide(mouseX,mouseY,50,random(150,255),random(150,255),random(150,255)));
}


function keyPressed() {
  if (keyCode === (ENTER) && atWelcomeScreen) {

    inGame = true;
    atWelcomeScreen = false;
  }

  if (keyCode === SHIFT) {
    location.reload();
  }
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
 welcome.text("hard to know - best to just run into it",width/2,1500);
 welcome.text("press enter to begin - click to ",width/2,2000);
  pop();


  push();
  texture(welcome);
  welcomePlane = plane(windowWidth,windowHeight);
  pop();
}
