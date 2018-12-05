

//NOBODY ASKED YOU
// a non-located/ one-sided/ poetic encounter

//phrases come mostly from assorted philosophy notes but i can't cite any more specifically than that.
//words, therefore, not all my own
//by Jules

//play as a gently breathing torus spinning through space. click to create entities who
//think they have something important to say.

//ignore it, or take it to heart

//2d graphic containing text for welcome screen
var welcome;
//boolean returning whether game is in session; false at welcome screen
var inGame = false;
//returns whether welcome screen is active. returns false when inGame is true
var atWelcomeScreen = true;
//plane displaying welcome graphic
var welcomePlane;
//holds external font for welcome screen
var welcomeFont;

//variable containing array that will display pastel balls when mouse is clicked
var guides = [];
//array holding various objects upon which phrases will be drawn
var phrase = [];
//tracks how many guides have been run into
var guidesHit = 0;
//array holding phrases, randomly selected to appear as texture
var displayedPhrases = []

//variable designating the user
var user;
//variable tracking how many times the mouse has been clicked
var clicks = 0;

//variables holding sound files, one to play for the duration of the game, one only
//when a guide is eaten
var thePop;
//i wanted music for the entire length of the game, but even cut down to a loop a couple
//minutes long it was making the program lag too much :(

function preload() {
  //loads font on welcome screen
  welcomeFont = loadFont("assets/fonts/BebasNeueLight.otf");
  //loads sound triggered when a guide is eaten
  thePop = loadSound("assets/sounds/pop.mp3");
}

function setup(){

  createCanvas(windowWidth,windowHeight,WEBGL);
  //creates a lost user, floating in a void of sorts, seaching for direction
  user = new User(width/2,height/2,100,0,0,10,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW);
  }


function draw(){

//welcome screen is active
  if (atWelcomeScreen) {
    welcomeScreen();
    }

//game is active
  if (inGame) {
    translate(-width/2,-height/2);

  background(0);
  //displays the user in the middle of the canvas and updates its position according to keyboard input
  user.handleInput();
  user.display();
  //array containing contents of phrase[] array
  fillPhrases();

//displays new objects wherever the mouse is clicked
  for (i = 0; i < clicks; i++) {
    guides[i].display();
    guides[i].encounter(user);
  }

//displays new phrase whenever a guide is eaten
  for (i=0; i < guidesHit; i++) {
    phrase[i].display();
    phrase[i].updatePosition();

    }
  }
}

//creates a new object at mouse location every time the mouse is clicked
function mouseReleased() {
  clicks += 1;
  guides.push (new Guide(mouseX,mouseY,100,random(150,255),random(150,255),random(150,255)));
}

function keyPressed() {
  //if enter key is hit at welcome screen, game begins
  if (keyCode === (ENTER) && atWelcomeScreen) {
    inGame = true;
    atWelcomeScreen = false;
  }

//welcome screen can be returned to at any time by hitting shift
  if (keyCode === SHIFT) {
    location.reload();
  }
}


function welcomeScreen() {

//creates an offscreen canvas to display text on
  welcome = createGraphics(width,height);

//creates text
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

//creates a plane to display graphic as a texture on
  push();
  texture(welcome);
  welcomePlane = plane(windowWidth,windowHeight);
  pop();
}

//fills the array containing the phrases, i kept it down here so it didn't bloat the
//top of the script
function fillPhrases() {

  displayedPhrases = [
    "lorem ipsum",
    "noli mi tangere",
    "thought thinking thoughts",
    "don't activate those pathways",
    "every habit is located in a cluster of co-dependent cells",
    "all bodies have something in common",
    "fracture and refraction are processes of self-formation",
    "the order of the social world produces unspeakable subjects",
    "knowledge is creation is power- thinking is prior to being",
    "isaac newton slaps the roof of a car - the roof slaps back",
    "what is the nature of your fantasy",
    "imagination produces reality",
    "the difference between you and yourself is object status",
    "a platitude is valuable if it cheers you up",
    "i'm worth my weight in pithy thoughts",
    "thanks for listening - it means a lot",
    "virtue as living at a critical distance from norms",
    "the reverse is true",
    "you can't decide when to listen, but what to hear",
    "sorry, fake news",
    "auto-poeisis is about as complex as taking a good selfie",
    "in the digital, what replaces the loss of the animal",
    "to be governed is to be given terms of existence",
    "concentrate on a reactivation of your affectionate nature",
    "every government gaslights",
    "a discontinuity, a faultline, a weakness - an opportunity",
    "freedom only in relation to one's own impulses",
    "fragility, mutability, humanity",
    "an image within a conversation lost to its speakers",
    "an object impeding its own theorization",
    "standard, limit, quality",
    "what is a thing of beauty, if not us",
    "feelings - easy enough to cancel, if minds were machines",
    "the discourse continues"
  ];
}
