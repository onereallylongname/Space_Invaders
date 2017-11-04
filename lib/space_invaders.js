var windX = 700;
var windY = 580;
var ship;
var invaders = [];
var shots = [];
var drops = [];
var stars;
var buttons;
var ground;
var numRows;
var numCols;
var myPoints;
var shotOnTarget;
var shotOffTarget;
var shotAcuracy;
var invX;
var gameOver;
var win;
var counter0;
var counterEnd;
var pause;
var sFR;
var lastFR;
var sound;
var soundOn;
var state;
var mic, fft, freq0;
var rnum = 0;
var spectrum = [];
var gameCanvas;
var gBC; //gameCanvasBuffer

var game = {
  'gameON': function() {
    gBC.background(31);
    makeGRandom();


    for (i = 0; i < 4; i++) {
      fft.analyze();
      spectrum[i] = fft.getEnergy(freq0[i]) / 255;
    }

    stars.update(spectrum);

    for (var i = invaders.length - 1; i >= 0; i--) {
      if (counter0 >= (abs(width / (numCols + 1) / invX))) {
        invX = -1 * invX;
        counter0 = 0;
      }
      invaders[i].update(invX, 0.02);
    }

    for (var i = 0; i < drops.length; i++) {
      drops[i].update(i);
    }
    for (var i = 0; i < shots.length; i++) {
      shots[i].update(i);
    }
    ground.update();

    ship.update();

    buttons.update();

    image(gBC, 0, 0);

    displayPoints();
    if (sFR) {
      displayFR();
    }

    if (invaders.length == 0) {
      win = true;
      counterEnd++;
      if (counterEnd > 60) {
        textSize(56);
        fill(0, 0, 0);
        text("You did it: " + String(myPoints) + '!', width / 2 - 7, height / 2 - 8);
        fill(230, 230, 0);
        text("You did it: " + String(myPoints) + '!', width / 2, height / 2);
        noLoop();
      }
    }
  },
  'showGameOver': function() {
    textSize(56);
    fill(0, 0, 0);
    text("GameOver", width / 2 - 7, height / 2 - 8);
    fill(230, 230, 0);
    text("GameOver", width / 2, height / 2);
  },
  'showPause': function() {
    image(gBC, 0, 0);
    textSize(56);
    fill(0, 0, 0);
    text("Pause", width / 2 - 7, height / 2 - 8);
    fill(230, 230, 0);
    text("Pause", width / 2, height / 2);

    var ss = soundOn ? 'on' : 'off';

    textSize(26);
    fill(0, 0, 0);
    text("Sound: " + ss, width / 2 - 3, height / 2 + 36);
    fill(230, 230, 0);
    text("Sound: " + ss, width / 2, height / 2 + 40);
  }
};

// make global random number
function makeGRandom() {
  rnum = random(0, 100);
};

// Populate Invaders
function popInvaders(invCols, invRows) {
  for (var i = 0; i < invCols; i++) {
    for (var j = 0; j < invRows; j++) {
      var x = (width / (invCols + 1)) * (i) + (width / (invCols + 1)) / 2;
      var y = ((height - 30 * invRows) / invCols) * j + 50;
      invaders.push(new Invader0(x, y));
    }
  }
}

function popStars() {
  for (var i = 0; i < 120; i++) {
    stars.push([random(width), random(height), random(0, 1.5)]);
  }
}

function displayPoints() {
  textSize(16);
  fill(230, 230, 0);
  text("Points: " + String(myPoints), 50, 20);
}

function displayFR() {
  textSize(16);
  fill(230, 230, 0);
  text("FR: " + String(round((frameRate() + lastFR) / 2)), 630, 20);
  lastFR = frameRate();
}

function createAllSounds(env, triOsc, sqrOsc, sinOsc) {
  sound.addSound(env, sinOsc, 'Invader', 110, 0.5, 0.05, 0.4, 0.05, 1); // env, triOsc, name, freq, attackLevel, attackTime, susPercent, decayTime, releaseTime
  sound.addSound(env, sqrOsc, 'Shot', 84, 0.25, 0.001, 0.3, 0.02, 0.5);
  sound.addSound(env, triOsc, 'Shot0', 300, 0.25, 0.001, 0.1, 0.02, 0.9);
  sound.addSound(env, sqrOsc, 'Drop', 500, 0.25, 0.001, 0.1, 0.02, 0.9);
  //  sound.addSound(env, sinOsc, 'Ship', 90, 0.45, 0.9, 0.5, 2, 1);
}

function restart() {
  ship;
  invaders = [];
  shots = [];
  stars = [];
  drops = [];
  numRows = 3;
  numCols = 6;
  myPoints = 0;
  shotOnTarget = 1;
  shotOffTarget = 0;
  shotAcuracy = 0;
  invX = 0.6;
  gameOver = false;
  win = false;
  counter0 = 0;
  counterEnd = 0;
  pause = false;
  noStroke();
  ship = new Ship();
  popInvaders(numCols, numRows);
  stars = new Stars(120);
  stars.popStars();
  buttons = new Buttons();
  buttons.create(20, windY - 80, 'left');
  buttons.create(140, windY - 80, 'right');
  buttons.create(560, windY - 80, 'shoot');
  ground = new Ground(windX, windY);
  textAlign(CENTER);
  background(21);
  sFR = false;
  lastFR = 60;
  soundOn = true;
  sound = new Sounds();
  var env = new p5.Env();
  var triOsc = new p5.Oscillator('triangle');
  var sqrOsc = new p5.Oscillator('square');
  var sinOsc = new p5.Oscillator('sine');
  createAllSounds(env, triOsc, sqrOsc, sinOsc);
  state = 'gameON';
  loop();
}

function setup() {
  gameCanvas = createCanvas(windX, windY);
  gameCanvas.parent('div_GameCanvas');
  gBC = createGraphics(windX, windY);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  freq0 = ["bass", "lowMid", "mid", "highMid", "treble"];
  restart();
}

function draw() {
  game[state]();
  counter0++;
}

function keyPressed() {
  pressPause(keyCode);
  pressLazer(keyCode);
  pressSound(keyCode);
  pressFramR(keyCode);
  pressReStr(keyCode);
}

function pressPause(keyCode) {
  if (keyCode === 80) {
    if (!pause) {
      pause = true;
      state = 'showPause';
      //  noLoop();
    } else {
      background(21);
      pause = false;
      state = 'gameON';
      //  loop();
    }
  }
}
function pressLazer(keyCode) {
  if (keyCode === 76) {
    if (!ship.lazer) {
      ship.lazer = true;
    } else {
      ship.lazer = false;
    }
  }
}
function pressSound(keyCode) {
  if (keyCode === 83) {
    if (!soundOn) {
      soundOn = true;
    } else {
      soundOn = false;
    }
  }
}
function pressFramR(keyCode) {
  if (keyCode === 70) {
    if (!sFR) {
      sFR = true;
    } else {
      sFR = false;
    }
  }
}
function pressReStr(keyCode) {
  if (keyCode === 82) {
    restart();
  }
}

/* Detect if the spacebar is being pressed. If it is, then prevent its default behaviour.
from: https://stackoverflow.com/questions/18522864/disable-scroll-down-when-spacebar-is-pressed-on-firefox */
document.documentElement.addEventListener('keydown', function (e) {
    if ( ( e.keycode || e.which ) == 32) {
        e.preventDefault();
    }
}, false);

/**
 from : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}




function mousePressed() {

}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

// from https://stackoverflow.com/questions/20160827/when-generating-normally-distributed-random-values-what-is-the-most-efficient-w
function gaussianRand() {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}
