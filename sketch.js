var capture;
var mic, fft;
var campitura= 'white';

function setup() {
         createCanvas(640,550);
         capture = createCapture(VIDEO);
         capture.size(640,480);
         capture.hide();
   mic = new p5.AudioIn();
   mic.start();
   fft = new p5.FFT();
   fft.setInput(mic);
}

function draw() {
  background(0);
  
  capture.loadPixels();
  var stepSize = round(constrain(mouseX / 8, 6, 32));
  for (var y=0; y<height; y+=stepSize) {
    for (var x=0; x<width; x+=stepSize) {
      var i = y * width + x;
      var darkness = (255 - capture.pixels[i*4]) / 255;
      var radius = stepSize * darkness;
      ellipse(x, y, radius, radius);
    }
  }
  
  var spectrum = fft.analyze();
   beginShape();
   for (i = 0; i<spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0) );
   }
   endShape();
   
   if(keyIsPressed) {  //keyIsPressed is a new variable
      
       fill(campitura);
        background(campitura);}
        
  textFont('Satisfy');
  textAlign(CENTER);
  textSize(15);
  fill(campitura,campitura,campitura,100);
  text("Move your mouse and press any keys",500,510);
}

function keyReleased(){
   campitura=color(random(255),random(255),random(255),100);
}
