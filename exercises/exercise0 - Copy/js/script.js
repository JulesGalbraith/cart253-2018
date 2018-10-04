

var squaresFilled = 0;
var area = 18700;
var timeVar = 0



function setup () {
  createCanvas(110,170);
}

  function draw() {

  while (squaresFilled < area) {
    fill(random(5,255));
    point(noise(1),noise(1));
    squaresFilled += 1;
    console.log("drawing a point");
  }
}
