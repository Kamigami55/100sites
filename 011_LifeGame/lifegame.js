var SIZE = 20;
var oldMap = [],
    newMap = [],
    num_x = 0,
    num_y = 0,
    paused = false,
    frameCount = 0;
var pauseButton;



function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  
  // init map
  num_x = windowWidth / SIZE;
  num_y = windowHeight / SIZE;
  for (var i = 0; i < num_x; ++i) {
    oldMap.push([]);
    newMap.push([]);
    for (var j = 0; j < num_y; ++j) {
      oldMap[i].push(false);
      newMap[i].push(false);
    }
  }
  loadDefaultMap();

  // init pause button
  pauseButton = createButton('Pause');
  pauseButton.size(80, 30);
  pauseButton.position(windowWidth/2-40, windowHeight-40);
  pauseButton.mousePressed(togglePauseSimulate);
}


function draw() {
  // fresh map every 5 frames
  if (!paused) {
    if (frameCount%5 == 0) {
      freshMap();
    }
  }
  // increase frame count
  ++frameCount;
  if (frameCount >= 30) {
    frameCount = 0;
  }

  drawMap();
}


// default map: a blink unit at top left corner
function loadDefaultMap() {
  oldMap[1][1] = true;
  oldMap[1][2] = true;
  oldMap[1][3] = true;
}


function drawMap() {
  background(0);
  // draw grid
  stroke(30);
  for (var i = 0; i < num_x; ++i) {
    line(i*SIZE, 0, i*SIZE, windowHeight);
  }
  for (var i = 0; i < num_y; ++i) {
    line(0, i*SIZE, windowWidth, i*SIZE);
  }
  fill(255);
  // draw cells
  for (var i = 0; i < num_x; ++i) {
    for (var j = 0; j < num_y; ++j) {
      if (oldMap[i][j]) {
        rect(i*SIZE, j*SIZE, SIZE, SIZE);
      }
    }
  }
  // draw mouse cell
  fill(color('rgba(100,100,100,0.5)'));
  var mouseCellX = int(mouseX / SIZE);
  var mouseCellY = int(mouseY / SIZE);
  rect(mouseCellX*SIZE, mouseCellY*SIZE, SIZE, SIZE);
}


// press ENTER to pause simulate
function keyPressed() {
  if (keyCode == ENTER) {
    togglePauseSimulate();
  }
}


// press mouse to add or remove cell
function mousePressed() {
  var mouseCellX = int(mouseX / SIZE);
  var mouseCellY = int(mouseY / SIZE);
  oldMap[mouseCellX][mouseCellY] = !oldMap[mouseCellX][mouseCellY]
}


function togglePauseSimulate() {
  if (paused) {
    paused = false;
  } else {
    paused = true;
  }
}



// count how many neighbors there are of a cell
function neighbors(xpos, ypos) {
  var total = 0;
  // four corners
  if (xpos != 0 && ypos != 0) {
    if (oldMap[xpos-1][ypos-1]) {
      ++total;
    }
  }
  if (xpos != 0 && ypos != num_y-1) {
    if (oldMap[xpos-1][ypos+1]) {
      ++total;
    }
  }
  if (xpos != num_x-1 && ypos != 0) {
    if (oldMap[xpos+1][ypos-1]) {
      ++total;
    }
  }
  if (xpos != num_x-1 && ypos != num_y-1) {
    if (oldMap[xpos+1][ypos+1]) {
      ++total;
    }
  }
  // left and right
  if (xpos != 0) {
    if (oldMap[xpos-1][ypos]) {
      ++total;
    }
  }
  if (xpos != num_x-1) {
    if (oldMap[xpos+1][ypos]) {
      ++total;
    }
  }
  if (ypos != 0) {
    if (oldMap[xpos][ypos-1]) {
      ++total;
    }
  }
  if (ypos != num_y-1) {
    if (oldMap[xpos][ypos+1]) {
      ++total;
    }
  }
  return total;
}


// calculate the next map according to the Life Game rule
function freshMap() {
  for (var i = 0; i < num_x; ++i) {
    for (var j = 0; j < num_y; ++j) {
      var neighbor_count = neighbors(i, j);
      if (neighbor_count <= 1 || neighbor_count >= 4) {
        newMap[i][j] = false;
      } else if (neighbor_count === 2) {
        newMap[i][j] = oldMap[i][j];
      } else { // neighbor_count === 3
        newMap[i][j] = true;
      }
    }
  }

  for (var i = 0; i < num_x; ++i) {
    for (var j = 0; j < num_y; ++j) {
      oldMap[i][j] = newMap[i][j];
    }
  }
}
