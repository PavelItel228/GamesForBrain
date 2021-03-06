function game() {
  this.randShape = new singFunc(generateShape);
  this.singTimeOut = new singFunc(timeDelay);
  this.singlChange = new singFunc(change);
  let singlRequest = new singlFunc();
  const username = $("meta[name='username']").attr("content");
  const token = $("meta[name='_csrf']").attr("content");
  const header = $("meta[name='_csrf_header']").attr("content");

  this.gameBegin = () => {
    background(228, 228, 228); //gray
    textSize(CANVAS_HEIGHT / 20);
    fill(75, 111, 255);
    text("Press Enter to start", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    textAlign(CENTER);
    document.addEventListener("keypress", function handler(e) {
      if (e.keyCode === 13) {
        stage = 1;
        this.removeEventListener("keypress", handler);
      }
    });
    this.isGlobalStatisticShowed = false;

  };

  this.firstShape = () => {
    background(228, 228, 228); //gray
    this.randShape.run();
    currentShape.form.draw(currentShape.color);
    this.singTimeOut.run(() => {
      stage = 2;
      this.randShape.executable = true;
      this.singTimeOut.executable = true;
    }, 1000)
  };


  this.showShape = () => {
    background(228, 228, 228);//gray
    this.singlChange.run();
    let prevFormIndex = Object.keys(shapes).indexOf(getKeyByValue(shapes, currentShape.form));
    let prevColorIndex = Object.keys(colors).indexOf(getKeyByValue(colors, currentShape.color));
    this.randShape.run(null, prevFormIndex, prevColorIndex);
    currentShape.form.draw(currentShape.color);
    tb.draw();
    fb.draw();
    timer.run();
  };
  this.grayScreen = () => {
    background(228, 228, 228);//gray
    this.singTimeOut.run(() => {
      stage = 2;
      this.randShape.executable = true;
      this.singTimeOut.executable = true;
    }, 500);
  };

  this.gameOver = () => {
    time = 40;
    background(228, 228, 228); //gray
    textSize(CANVAS_HEIGHT / 20);
    fill(75, 111, 255);
    let txt = `You lose, correct answers ${score}\nYour score: ${normalizeScore(score)}\n Press enter to restart`;
    text(txt, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    textAlign(CENTER);
    if (!this.isGlobalStatisticShowed){
      let lastGameResult = lastGameStatistics(DATA, normalizeScore(score));
      showLastGameStatistics(lastGameResult);
    }
    this.isGlobalStatisticShowed = true;
    let headers = new Headers({
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      [header]: token,
    });
    singlRequest.run(() => {
      fetch('/createStatistic', {
        method: 'POST',
        mode: 'cors',
        headers,
        body: JSON.stringify({
          score: normalizeScore(score),
          username: username,
          testType: "IsPreviousTest"
        })
      });
    });
    document.addEventListener("keypress", function handler(e) {
      if (e.keyCode === 13) {
        $("#statistic").slideUp(1000);
        score = 0;
        stage = 1;
        this.removeEventListener("keypress", handler);
      }
    });
  };

  function singlFunc() {
    this.executable = true;
    this.run = (def) => {
      if (this.executable) {
        this.executable = false;
        def();
      }
    };
  }

  function getRandomObj(collection, mean, min, max) {
    let keys = Array.from(Object.keys(collection));
    return collection[keys[Math.round(g.next(mean, min, max))]];
  }

  function generateShape(callback, ...args) {
    let meanForm, meanColor;
    if (args[0].length === 2) {
      meanForm = args[0][0];
      meanColor = args[0][1];
    } else {
      meanForm = 2;
      meanColor = 1;
    }
    currentShape = {
      form: getRandomObj(shapes, meanForm, 0, 4),
      color: getRandomObj(colors, meanColor, 0, 2),
    };
  }

  function singFunc(def) {
    this.executable = true;
    this.run = (callback, ...args) => {
      if (this.executable) {
        def(callback, args);
        this.executable = false;
      }
    };
  }

  const normalizeScore = (score) => {
    return parseInt(200 * Math.atan(0.3 * score) / Math.PI);
  };

  function change(callback, ...args) {
    prevShape = currentShape;
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  function timeDelay(callback, ...args) {
    setTimeout(callback, args);
  }
}
