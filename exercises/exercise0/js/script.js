/*****************

//spiritual self portrait

ratboi jlz!

******************/

function setup() {

//sets canvas size and background colour
createCanvas(600,600);
background(161, 142, 255,150);

//creates a humanoid-ish head
fill(219, 255, 227);
noStroke()
ellipse(300,400,240,600);

//hides bottom of ellipse, establishes horizon
fill(161, 142, 255);
noStroke();
rectMode(CENTER);
rect(300,600,600,400);

//black shirt
fill(0);
beginShape();
curveVertex(240,600);
curveVertex(240,600);
curveVertex(250,540);
curveVertex(300,520);
curveVertex(345,540);
curveVertex(370,600);
curveVertex(360,600);
endShape();

//chin

fill(219, 255, 227);
  beginShape();
  curveVertex(180,400);
  curveVertex(180,400);
  curveVertex(195,430);
  curveVertex(270,500);
  curveVertex(300,520);
  curveVertex(330,500);
  curveVertex(405,430);
  curveVertex(420,400);
  curveVertex(420,400);
  endShape();

//eyes - lids
fill(30,160);
ellipse(250,290,65,120);
ellipse(350,290,65,120);
//whites
fill(255);
noStroke();
ellipse(250,300,60,110);
ellipse(350,300,60,110);
//iris, pupils
stroke(137, 156, 193);
strokeWeight(10);
fill(25)
ellipse(255,286,30,50);
ellipse(355,286,30,50);
//shine
fill(255);
noStroke();
ellipse(265,275,10,15);
ellipse(365,275,10,15);

//die Nase
noFill();
strokeWeight(5);
stroke(131,211,149);
curve(270,400,287,370,310,370,280,400);


//mouth
noFill();
strokeWeight(25);
stroke(255,200,150);
curve(200,100,300,420,300,420,400,100);
fill(168,37,5);
stroke(168,37,5,150);
strokeWeight(8);
ellipse(300,455,15,20);

//brow crease

noFill();
strokeWeight(3);
stroke(131,211,149);
beginShape();
vertex(235,200);
quadraticVertex(270,180,290,200);
quadraticVertex(300,220,310,200);
quadraticVertex(330,180,365,200);
endShape();

noFill();
strokeWeight(3);
stroke(131,211,149);
beginShape();
vertex(255,180);
quadraticVertex(280,170,295,180);
quadraticVertex(300,190,305,180);
quadraticVertex(320,170,345,180);
endShape();


//bling bling

stroke(100);
strokeWeight(2);
fill(255);
ellipse(300,480,5,5);
stroke(50,120);
strokeWeight(10);
fill(255,255);
curve(400,470,280,522,320,522,200,470);

}


// draw()
//
//draws an ABDUCTION BEAM

function draw()
{ frameRate(10);
  noStroke();
  fill(10,255,30,2);
  quad(600,0,560,0,-30,600,250,600);


}
