let game;

function setup() {
  const WIDTH = 500;
  const HEIGHT = 500;
  let canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent('canvas');
  game = new Game(WIDTH, HEIGHT);
}

function draw() {
  background(228);
  game.draw();
}

function keyTyped() {
  game.keyTyped();
}

function mouseClicked() {
  game.mouseClicked();
}

