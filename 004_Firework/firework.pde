int time = 0;
ArrayList fireworks = new ArrayList();


void setup() {
  size(600, 600);
  frameRate(30);
  smooth();
  noStroke();
  loop();
}



void draw() {
  background(0);
  if(int(random(4)) == 0){
    add_firework(50+int(random(500)), 50+int(random(350)));
  }
  display_firework();
  draw_taipei101();
  removeOldFirework();
}



void mousePressed() {
  add_firework(mouseX, mouseY);
}



void display_firework() {
  for(int i = 0; i < fireworks.size(); ++i){
    fireworks.get(i).display();
  }
}



void removeOldFirework() {
  for(int i = 0; i < fireworks.size(); ++i) {
    if(fireworks.get(i).passingTime > 20) {
      fireworks.remove(i);
    }
  }
}



void add_firework(int x, int y) {
  fireworks.add(new Firework(x, y));
}



void draw_taipei101() {
  fill(100);
  quad(270, 560, 330, 560, 320, 600, 280, 600);
  quad(270, 520, 330, 520, 320, 560, 280, 560);
  quad(270, 480, 330, 480, 320, 520, 280, 520);
  quad(270, 440, 330, 440, 320, 480, 280, 480);
  rect(295, 410, 10, 30);
  rect(299, 390, 2, 20);
}



class Firework {
  int x;
  int y;
  int directions;
  int passingTime;
  int colorR;
  int colorG;
  int colorB;

  Firework(int myX, int myY) {
    x = myX;
    y = myY;
    directions = 6+int(random(16));
    colorR = 100+int(random(155));
    colorG = 100+int(random(155));
    colorB = 100+int(random(155));
    passingTime = 0;
  }

  void display() {
    fill(colorR, colorG, colorB);
    for(int i = 0; i < directions; ++i) {
      ellipse(x+4*passingTime*sin(TWO_PI*i/directions), y+4*passingTime*cos(TWO_PI*i/directions), 7, 7);
    }
    ++passingTime;
  }

}