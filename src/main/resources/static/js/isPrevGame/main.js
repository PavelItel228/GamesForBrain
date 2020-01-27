const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;
const Game = new game();
let stage = 0;
const g = new Gauss();
const tb = new trueButton();
const fb = new falseButton();
let score = 0;
let currentShape;
let prevShape;





const shapes = {
  rectangle : new Rect(),
  circle : new Circle(),
  triangle : new Triangle(),
  pentagon : new Pentagon(),
  rhombus : new Rhombus(),
};

const colors = {
  orange : [204, 102, 0],
  yellow : [204, 204, 0],
  red : [204, 0, 0],
}



function setup() {
  cnv = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw () {
  switch (stage) {
    case 0:
      Game.gameBegin();
      break;
    case 1:
      Game.firstShape();
      break;
    case 2:
      Game.showShape();
      break;
    case 3:
      Game.gameOver();
      break;
  }
}
