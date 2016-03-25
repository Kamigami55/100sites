var attackLevel = 2.0;
var releaseLevel = 0;

var attackTime = 0.001;
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;

var env, triOsc;
var notePressed = [false, false, false, false, false, false, false, false, false, false, false, false];
var fft;

function setup() {
  createCanvas(windowWidth, windowHeight);

  textAlign(CENTER);
  textSize(40);

  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  triOsc = new p5.Oscillator('sine');
  triOsc.amp(env);
  triOsc.start();

  ellipseMode(CENTER);
  strokeWeight(2);
  rectMode(CENTER);
  
  fft = new p5.FFT();
}


function draw() {
  background(200);

  // title
  fill(255);  
  strokeWeight(5);
  textSize(120);
  textFont("Georgia");
  text("PIANO", width/2, 150);
  textFont("Normal");

  // spectrum 
  var spectrum = fft.analyze(); 
  noStroke();
  fill(230); 
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width/2);
    var h = -height/2 + map(spectrum[i], 0, 255, height/2, 0);
    rect(x, height/2, width / spectrum.length, h);
    rect(width-x, height/2, width / spectrum.length, h);
  }

  // black note
  drawNote(windowWidth/2-150, windowHeight/2-60, 'E', 'b', notePressed[0]);
  drawNote(windowWidth/2-90, windowHeight/2-60, 'R', 'b', notePressed[1]);
  drawNote(windowWidth/2+30, windowHeight/2-60, 'Y', 'b', notePressed[2]);
  drawNote(windowWidth/2+90, windowHeight/2-60, 'U', 'b', notePressed[3]);
  drawNote(windowWidth/2+150, windowHeight/2-60, 'I', 'b', notePressed[4]);
  
  // white note
  drawNote(windowWidth/2-180, windowHeight/2, 'S', 'w', notePressed[5]);
  drawNote(windowWidth/2-120, windowHeight/2, 'D', 'w', notePressed[6]);
  drawNote(windowWidth/2-60, windowHeight/2, 'F', 'w', notePressed[7]);
  drawNote(windowWidth/2, windowHeight/2, 'G', 'w', notePressed[8]);
  drawNote(windowWidth/2+60, windowHeight/2, 'H', 'w', notePressed[9]);
  drawNote(windowWidth/2+120, windowHeight/2, 'J', 'w', notePressed[10]);
  drawNote(windowWidth/2+180, windowHeight/2, 'K', 'w', notePressed[11]);
}


function playEnv(f){
  triOsc.freq(f);
  env.play();
}


function drawNote(xpos, ypos, key, color, pressed) {
  // black note
  var big = 0;
  if (pressed) {
    big = 8;
  }
  // shadow
  fill(100);
  strokeWeight(0);
  ellipse(xpos+3, ypos+3, 50+big, 50+big);
  // note
  if (color == 'b') {
    fill(0);
    stroke(255);  
  } else {
    fill(255);
    stroke(0);  
  }
  strokeWeight(2);
  ellipse(xpos, ypos, 50+big, 50+big);
  // text
  if (color == 'b') {
    fill(255);  
  } else {
    fill(0);
  }
  textSize(40);
  if (pressed) {
    textSize(44);
  }
  text(key, xpos, ypos+17);
}


function keyPressed() {
  switch (keyCode) {
  case 83: // S
  case 115: // s
    playEnv(261); // C note
    notePressed[5] = true;
    break;
  case 69: // E
  case 101: // e
    playEnv(277); // C# note
    notePressed[0] = true;
    break;
  case 68: // D
  case 110: // d
    playEnv(293); // D note
    notePressed[6] = true;
    break;
  case 82: // R
  case 114: // r
    playEnv(311); // D# note
    notePressed[1] = true;
    break;
  case 70: // F
  case 102: // f
    playEnv(329); // E note
    notePressed[7] = true;
    break;
  case 71: // G
  case 103: // g
    playEnv(349); // F note
    notePressed[8] = true;
    break;
  case 89: // Y
  case 121: // y
    playEnv(369); // F# note
    notePressed[2] = true;
    break;
  case 72: // H
  case 104: // h
    playEnv(392); // G note
    notePressed[9] = true;
    break;
  case 85: // U
  case 117: // u
    playEnv(415); // G# note
    notePressed[3] = true;
    break;
  case 74: // J
  case 106: // j
    playEnv(440); // A note
    notePressed[10] = true;
    break;
  case 73: // U
  case 105: // u
    playEnv(466); // A# note
    notePressed[4] = true;
    break;
  case 75: // K
  case 107: // k
    playEnv(493); // B note
    notePressed[11] = true;
    break;
  default:
    break;
  }
}

function keyReleased() {
  switch (keyCode) {
  case 83: // S
  case 115: // s
    // C note
    notePressed[5] = false;
    break;
  case 69: // E
  case 101: // e
    // C# note
    notePressed[0] = false;
    break;
  case 68: // D
  case 110: // d
    // D note
    notePressed[6] = false;
    break;
  case 82: // R
  case 114: // r
    // D# note
    notePressed[1] = false;
    break;
  case 70: // F
  case 102: // f
    // E note
    notePressed[7] = false;
    break;
  case 71: // G
  case 103: // g
    // F note
    notePressed[8] = false;
    break;
  case 89: // Y
  case 121: // y
    // F# note
    notePressed[2] = false;
    break;
  case 72: // H
  case 104: // h
    // G note
    notePressed[9] = false;
    break;
  case 85: // U
  case 117: // u
    // G# note
    notePressed[3] = false;
    break;
  case 74: // J
  case 106: // j
    // A note
    notePressed[10] = false;
    break;
  case 73: // U
  case 105: // u
    // A# note
    notePressed[4] = false;
    break;
  case 75: // K
  case 107: // k
    // B note
    notePressed[11] = false;
    break;
  default:
    break;
  }
}