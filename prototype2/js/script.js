

var numGuides = 5;
var guideIndex = 0;
var guides = [];
var user;


function setup(){

  createCanvas(windowWidth,windowHeight,WEBGL);
  console.log(width,height);
  background(0);

 user = new User(width/2,height/2,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,DOWN_ARROW);
}

function draw(){
translate (-width/2,-height/2);
background(0);

user.moveUser();
user.displayUser();

displayGuides();

}

function displayGuides() {

var offset = 400;
 var guideSize = 100

  for (i = 0 ; i < 5; i++) {
  guides.push(new Guide(width/5,(guideIndex+1)*offset,guideSize));
  guideIndex += 1;
  guides[i].display();
  }

  for (i = 5 ; i < 10; i++) {
  guides.push(new Guide(2*width/5,(guideIndex-4)*offset,guideSize));
  guideIndex += 1;
  guides[i].display();
  }

  for (i = 10; i < 15; i++) {
  guides.push(new Guide(3*width/5,(guideIndex-9)*offset,guideSize));
  guideIndex += 1;
  guides[i].display();
  }

  for (i = 15; i < 20; i++) {
  guides.push(new Guide(4*width/5,(guideIndex-14)*offset,guideSize));
  guideIndex += 1;
  guides[i].display();
  }

}
