var BAR_MOVE_SPEED = 15;
var BALL_SIZE = 20;
var BALL_SPEED = 10;

var MAP_WIDTH = 800;
var MAP_HEIGHT = 500;

var BAR_WIDTH = 10;
var BAR_HEIGHT = 120;

var p1_y;
var p2_y;
var p1_score;
var p2_score;

var ball_x;
var ball_y;
var ball_velocity_x;
var ball_velocity_y;

var gamePaused = false;
var gameStarted = false;

function setup() {
  MAP_WIDTH = windowWidth;
  MAP_HEIGHT = windowHeight;
  createCanvas(MAP_WIDTH, MAP_HEIGHT);
  
  ellipseMode(CENTER);
  rectMode(CENTER);

  p1_y = MAP_HEIGHT/2;
  p2_y = MAP_HEIGHT/2;
  p1_score = 0;
  p2_score = 0;
  ball_x = MAP_WIDTH/2;
  ball_y = MAP_HEIGHT/2;
  ball_velocity_x = BALL_SPEED;
  ball_velocity_y = BALL_SPEED;
}

function draw() {

  if(!gamePaused && gameStarted) {
    pleyerControl();
    ballMove();
    ballCollide();
    checkBallOutside();
  }
  displayGame();
  displayGUI();

}


function keyPressed() {
  if(keyCode === ENTER) {
    if(!gameStarted) {
      gameStarted = true;
    } else {
      gamePaused = !gamePaused;
    }
  }
}


function pleyerControl() {
  if(keyIsDown(87) || keyIsDown(119)) { // W
    if(p1_y-BAR_HEIGHT/2 > 0) {
      p1_y -= BAR_MOVE_SPEED;
    }
  } else if (keyIsDown(83) || keyIsDown(115)) { // S
    if(p1_y+BAR_HEIGHT/2 < MAP_HEIGHT) {
      p1_y += BAR_MOVE_SPEED;
    }
  }

  if(keyIsDown(UP_ARROW)) { // UP
    if(p2_y-BAR_HEIGHT/2 > 0) {
      p2_y -= BAR_MOVE_SPEED;
    }
  } else if (keyIsDown(DOWN_ARROW)) { // DOWN
    if(p2_y+BAR_HEIGHT/2 < MAP_HEIGHT) {
      p2_y += BAR_MOVE_SPEED;
    }
  }
}


function ballMove() {
  ball_x += ball_velocity_x;
  ball_y += ball_velocity_y;
}


function ballCollide() {
  if(ball_y+BALL_SIZE/2 > MAP_HEIGHT || ball_y-BALL_SIZE/2 < 0) { // collide with upper and lower walls
    ball_velocity_y = -ball_velocity_y;
  }

  if(ball_x <= 30+BAR_WIDTH/2 // collide with player1
    && ball_x >= 30-BAR_WIDTH/2
    && ball_y >= p1_y-BAR_HEIGHT/2 
    && ball_y <= p1_y+BAR_HEIGHT/2) { 
      ball_velocity_x = -ball_velocity_x;
       // slightly change ball y speed according to the position ball hit on the bar
      ball_velocity_y += (ball_y-p1_y)*10/(BAR_HEIGHT/2);
      if(ball_velocity_y > BALL_SPEED) // strict the ball speed not exceed max speed
        ball_velocity_y = BALL_SPEED;
      else if(ball_velocity_y < -BALL_SPEED)
        ball_velocity_y = -BALL_SPEED;
  }

  if(ball_x >= MAP_WIDTH-30-BAR_WIDTH/2 // collide with player2
    && ball_x <= MAP_WIDTH-30+BAR_WIDTH/2
    && ball_y >= p2_y-BAR_HEIGHT/2 
    && ball_y <= p2_y+BAR_HEIGHT/2) { 
      ball_velocity_x = -ball_velocity_x;
       // slightly change ball y speed according to the position ball hit on the bar
      ball_velocity_y += (ball_y-p2_y)*10/(BAR_HEIGHT/2);
      if(ball_velocity_y > BALL_SPEED) // strict the ball speed not exceed max speed
        ball_velocity_y = BALL_SPEED;
      else if(ball_velocity_y < -BALL_SPEED)
        ball_velocity_y = -BALL_SPEED;
  }
}


function checkBallOutside() {
  if(ball_x > MAP_WIDTH) {
    ball_x = MAP_WIDTH/2;
    ball_y = MAP_HEIGHT/2;
    ++p1_score;
  } else if(ball_x < 0) {
    ball_x = MAP_WIDTH/2;
    ball_y = MAP_HEIGHT/2;
    ++p2_score;
  }
}


function displayGame() {
  background(0);
  fill(255); // white
  rect(30, p1_y, BAR_WIDTH, BAR_HEIGHT); // player1 bar
  rect(MAP_WIDTH-30, p2_y, BAR_WIDTH, BAR_HEIGHT); // player2 bar
  fill(0,255,255);
  ellipse(ball_x, ball_y, BALL_SIZE, BALL_SIZE); // ball
}


function displayGUI() {
  
  if(gamePaused) {
    textSize(100);
    fill(255);
    textAlign(CENTER);
    text("PAUSED", MAP_WIDTH/2, MAP_HEIGHT/2);
  }
  if(!gameStarted) {
    textAlign(CENTER);
    textSize(100);
    fill(0, 255, 255);
    text("Pong!", MAP_WIDTH/2, 150);
    fill(255);
    textSize(80);
    text("Press ENTER to Start", MAP_WIDTH/2, MAP_HEIGHT/2);
    textSize(40);
    text("Left player: W, S to move\nRight player: UP, DOWN to move\nPress ENTER to pause", MAP_WIDTH/2, MAP_HEIGHT/2+150); 
  }
  textSize(30);
  textAlign(LEFT);
  text(p1_score, 30, 30);
  textAlign(RIGHT);
  text(p2_score, MAP_WIDTH-30, 30);
}
