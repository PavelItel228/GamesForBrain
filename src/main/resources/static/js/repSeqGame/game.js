function game(width, height, gridLen, seqLen) {
  this.init = () => {
    this.width = width;
    this.height = height;
    this.gridLen = gridLen;
    this.seqLen = seqLen;
  };

  this.init();

  this.newGame = () => {
    this.stages = ["StartingScreen", "ShowingSequence", "GuessingSequence", "EvalResult",
      "StagePassedCorrectly", "StagePassedIncorrectly"];
    this.stage = 0;
  };

  this.drawGrid = () => {
    fill(200, 180, 160);
    noStroke();
  };

  this.drawStartScreen = () => {
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(0, 52, 123);
    let txt = "Try to repeat tiles in the same order\n"
      + "as they were lightened\n"
      + "You won't start next stage until you \n"
      + "repeat all tiles in the right order\n"
      + "Press 'Enter' to start";
    text(txt, this.width / 2, this.height / 2);
  };

  this.drawHeader = () => {
    textSize(18);
    textAlign(CENTER, CENTER);
    fill(0, 52, 123);
    let txt = "Sequence length: " + this.seqLen;
    text(txt, this.width / 2, this.height / 8);
  };

  this.drawGameOver = () => {
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(0, 52, 123);
    let txt = "Game Over\nYour last sequence length: " + this.seqLen;
    text(txt, this.width / 2, this.height / 2);
  };

  this.mouseClicked = () => {
    if (this.stage === 2) {
      this.grid.mouseClicked();
    }
  };

  this.keyTyped = () => {
    if ((this.stage === 0) && (keyCode === 13)) {
      this.stage = 10
    } else if (this.stage === 1) {

    } else if (this.stage === 2) {

    }
  };

  this.draw = () => {

    if (this.stage === 0) {
      this.drawStartScreen();
    } else if (this.stage === 1) {
      this.grid.draw();
      this.drawHeader();
      if (this.grid.stage === 2) {
        this.stage = 2;
      }
    } else if (this.stage === 2) {
      this.drawHeader();
      this.grid.draw();
      if (this.grid.stage === 4) {
        this.stage = 4;
      } else if (this.grid.stage === 5) {
        this.stage = 5;
      }
    } else if (this.stage === 5) {
      this.drawGameOver();
      // send results to server
    } else if (this.stage === 4) {
      this.stage = 10;
      this.gridLen += 1;
      this.seqLen += 1;
    } else if (this.stage === 10) {
      this.stage = 1;
      this.grid = new grid(size = this.gridLen, [100, 150], [500, 550], this.seqLen)
      this.grid.stage = 1;
      this.grid.genSeq();
    }
  }


}