/* @pjs globalKeyEvents="true"; */

int NUM_OF_PILES = 26; // how many piles per dimension
int PILE_SIZE = 18; // unit: px
int SPEED = 12; // frame rate
int DEFAULT_SNACK_LENGTH = 4; 
int DIRECTION_UP = 1; // direction of the snack (1:up 2:down 3:left 4:right)
int DIRECTION_DOWN = 2;
int DIRECTION_LEFT = 3;
int DIRECTION_RIGHT = 4;
int DEFAULT_SNACK_DIRECTION = DIRECTION_UP; 

int direction = DEFAULT_SNACK_DIRECTION; // direction of snack
ArrayList snack = new ArrayList();
Food food = new Food(0, 0); // the only food on the board
boolean isPausing = true; // whether the game is pausing


void setup() {
  size(NUM_OF_PILES * PILE_SIZE, NUM_OF_PILES * PILE_SIZE);
  ellipseMode(CORNER);
  frameRate(SPEED);
  
  resetSnack();
  food.resetPosition();
  
  noLoop(); // the default state of the game is pausing
  isPausing = true;
}


void resetSnack() {
  // clear snack arrarList
  for(int i = 0; i < snack.size(); ++i) {
    snack.remove(0);
  }
  direction = DEFAULT_SNACK_DIRECTION; // set direction to default (up)

  // set the snack at the center of the board with default snack length
  // +i is to set the tail of snack to the south(+Y)
  for(int i = 0; i < DEFAULT_SNACK_LENGTH; ++i) {
    snack.add(new SnackUnit(NUM_OF_PILES/2, NUM_OF_PILES/2+i));
  }
}



void draw() {
  background(50);
  for(int i = 0; i < snack.size(); ++i) {
    snack.get(i).display();
  }
  food.display();

  snackMove();
  checkFood();
  checkLose();
}


void snackMove() {
  int vx = 0; // velocity of the snack at x axis (-1, 0, 1)
  int vy = 0; // velocity of the snack at x axis (-1, 0, 1)
   // set velocities according to the direction
  switch(direction) {
    case DIRECTION_UP:
      vy = -1;
      break;
    case DIRECTION_DOWN:
      vy = 1;
      break;
    case DIRECTION_LEFT:
      vx = -1;
      break;
    case DIRECTION_RIGHT:
      vx = 1;
      break;
    default:
      break;
  }
   // move snack body forward
  for(int i = snack.size()-1; i > 0; --i) {
    snack.get(i).xpos = snack.get(i-1).xpos;
    snack.get(i).ypos = snack.get(i-1).ypos;
  }
   // move snack head forward according to the velocities
  snack.get(0).xpos += vx;
  snack.get(0).ypos += vy;

   // if the snack is in the wall, make it appear on the other side
  if(snack.get(0).xpos < 0)
    snack.get(0).xpos = NUM_OF_PILES-1;
  else if(snack.get(0).xpos > NUM_OF_PILES-1)
    snack.get(0).xpos = 0;
  else if(snack.get(0).ypos < 0)
    snack.get(0).ypos = NUM_OF_PILES-1;
  else if(snack.get(0).ypos > NUM_OF_PILES-1)
    snack.get(0).ypos = 0;
}


void checkFood() {
  if(snack.get(0).isOn(food.xpos, food.ypos)) {
     // append a new snack body at the tail
    snack.add(new SnackUnit(snack.get(snack.size()-1).xpos, snack.get(snack.size()-1).ypos));
    food.resetPosition();
  }
}


void checkLose() {
   // if the snack hit itself
  for(int i = 1; i < snack.size(); ++i) {
    if(snack.get(0).isOn(snack.get(i).xpos, snack.get(i).ypos)) {
       // the player lose, pause the game
      isPausing = true;
      noLoop();
    }
  }
}


void keyPressed() {
  switch(keyCode) {
     // pressing arrow key to change the direction
    case UP:
      direction = DIRECTION_UP;
      break;
    case DOWN:
      direction = DIRECTION_DOWN;
      break;
    case LEFT:
      direction = DIRECTION_LEFT;
      break;
    case RIGHT:
      direction = DIRECTION_RIGHT;
      break;
     // pressing ENTER and RETURN to toggle Pausing state
    case ENTER:
    case RETURN:
      if(isPausing) {
        isPausing = false;
        loop();
      } else {
        isPausing = true;
        noLoop();
      }
      break;
    default:
      break;
  }
}


class SnackUnit {
  int xpos, ypos;

  SnackUnit(int x, int y) {
    xpos = x;
    ypos = y;
  }
  void display() {
    fill(255);
    rect(xpos*PILE_SIZE, ypos*PILE_SIZE, PILE_SIZE, PILE_SIZE);
  }
  boolean isOn(int x, int y) {
    return xpos == x && ypos == y;
  }
}


class Food {
  int xpos, ypos;

  Food(int x, int y) {
    xpos = x;
    ypos = y;
  }
  void display() {
    fill(255);
     // the size of the food is 4px smaller than a pile
    ellipse(xpos*PILE_SIZE+2, ypos*PILE_SIZE+2, PILE_SIZE-4, PILE_SIZE-4);
  }
  void resetPosition() {
    xpos = int(random(0, NUM_OF_PILES));
    ypos = int(random(0, NUM_OF_PILES));
    for(int i = 0; i < snack.size(); ++i) {
      if(snack.get(i).isOn(xpos, ypos)) { // if the snack is already on the position of the new food
        resetPosition(); // reset food position to another place
      }
    }
  }
}
