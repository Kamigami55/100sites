var rows = 0, // how many shapes there are vertically
    cols = 0, // how many shapes there are horizontally
    diameter = [], // diameter of every single shape
    displayMode = 0, // four display mode: 0: red rect, 1: red ellipse, 2: blue rect, 3: blue ellipse
    MARGIN = 30, // distance between two shapes
    MAX_SIZE = 100, // max shape size when mouse approach
    SENSE_RANGE = 200; // what distance shapes will react

function setup() {

  createCanvas(windowWidth, windowHeight);
  strokeWeight(0);
  ellipseMode(CENTER);
  rectMode(CENTER);
  frameRate(30);

  rows = windowHeight / MARGIN;
  cols = windowWidth / MARGIN;

  // initialize diameter 2-dimensional array
  for (var y = 0; y < rows; ++y) { 
    diameter.push([]);
    for (var x = 0; x < cols; ++x) {
      diameter[y].push(0);
    }
  }
}

function draw() {

  background(20);
  for (var y = 0; y < rows; y += 1) {
    for (var x = 0; x < cols; x += 1) {
      var thisDiameter = diameter[y][x];

      // decrease diameter by time until diameter is 0
      if (thisDiameter < 2) {
        diameter[y][x] = 0;        
      } else { // thisDiameter >= 2
        diameter[y][x] -= 2;
        thisDiameter = diameter[y][x];        
        
        // And we can now display it
        // Determine which color should we use
        if (displayMode <= 1) { // 0, 1
          fill(255,thisDiameter*2.5,0); // red color mode
        } else { // 2, 3
          fill(0,thisDiameter*2.5,255-thisDiameter*1.5); // blue color mode
        }
        // Determine which shape should we use
        if (displayMode == 0 || displayMode == 2) { // 0, 2
          rect(x*MARGIN, y*MARGIN, thisDiameter, thisDiameter); // rect mode
        } else { // 1, 3
          ellipse(x*MARGIN, y*MARGIN, thisDiameter, thisDiameter); // ellipse mode
        }
      } // .if-else
    } // .for
  } // .for
}

// when mouse moved, adjust diameters of every shapes
function mouseMoved() {

  for (var y = 0; y < rows; y += 1) {
    for (var x = 0; x < cols; x += 1) {
      // calculus the distance between this shape and user mouse
      var dist = Math.sqrt((x*MARGIN-mouseX)*(x*MARGIN-mouseX)+(y*MARGIN-mouseY)*(y*MARGIN-mouseY));
      if (dist <= SENSE_RANGE) {
        // calculus the diameter based on the distance
        var theDiameter = (SENSE_RANGE - dist)*MAX_SIZE/SENSE_RANGE;
        // if current diameter is smaller than the calc diameter
        if (diameter[y][x] < theDiameter) {
          diameter[y][x] = theDiameter; // increase the current diameter to it should be
        }
      }
    }
  }
}

// switch display mode
function mousePressed() {
  ++displayMode;
  if (displayMode > 3) {
    displayMode = 0;
  }
}