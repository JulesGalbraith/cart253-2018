//



var ball1;
var ball2

function setup() {
  createCanvas(640,480);
  ball1 = new Ball(100,200,10,5,1,10);
  ball2 = new Ball(500,200,20,1,5,20);
}
function draw() {
  background(0);
  ball1.update();
  ball2.update();
  ball1.display();
  ball2.display();
}
