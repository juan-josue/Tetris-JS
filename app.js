const GRID = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll(".grid div"));
const SCORE_DISPLAY = document.querySelector("#score");
const START_BTN = document.querySelector("#start-button");
const WIDTH = 10;

// Tetrominoes
const LTETROMINO = [
  [1, WIDTH + 1, WIDTH * 2 + 1, 2],
  [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 2],
  [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 2],
  [WIDTH, WIDTH * 2, WIDTH * 2 + 1, WIDTH * 2 + 2],
];

const ZTETROMINO = [
  [0, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
  [WIDTH + 1, WIDTH + 2, WIDTH * 2, WIDTH * 2 + 1],
  [0, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
  [WIDTH + 1, WIDTH + 2, WIDTH * 2, WIDTH * 2 + 1],
];

const TTETROMINO = [
  [1, WIDTH, WIDTH + 1, WIDTH + 2],
  [1, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1],
  [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1],
  [1, WIDTH, WIDTH + 1, WIDTH * 2 + 1],
];

const OTETROMINO = [
  [0, 1, WIDTH, WIDTH + 1],
  [0, 1, WIDTH, WIDTH + 1],
  [0, 1, WIDTH, WIDTH + 1],
  [0, 1, WIDTH, WIDTH + 1],
];

const ITETROMINO = [
  [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 3 + 1],
  [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH + 3],
  [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 3 + 1],
  [WIDTH, WIDTH + 1, WIDTH + 2, WIDTH + 3],
];

const TETROMINOES = [
  LTETROMINO,
  ZTETROMINO,
  TTETROMINO,
  OTETROMINO,
  ITETROMINO,
];

let currentPosition = 4;
let currentRotation = 0;

//randomly select a tetromino
let random = Math.floor(Math.random() * TETROMINOES.length);
let current = TETROMINOES[random][currentRotation];

function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  });
}

//undraw Tetromino
function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove("tetromino");
  });
}

//make the Tetromino move down every second
timerId = setInterval(moveDown, 1000);

//controls
function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 38) {
    // rotate();
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 39) {
    moveDown();
  }
}
document.addEventListener("keyup", control);

function moveDown() {
  undraw();
  currentPosition += WIDTH;
  draw();
  freeze();
}

//freeze function
function freeze() {
  if (
    current.some((index) =>
      squares[currentPosition + index + WIDTH].classList.contains("taken")
    )
  ) {
    current.forEach((index) =>
      squares[currentPosition + index].classList.add("taken")
    );
    // make a new tetromino
    random = Math.floor(Math.random() * TETROMINOES.length);
    current = TETROMINOES[random][currentRotation];
    currentPosition = 4;
    draw();
  }
}

//movement
function moveLeft() {
  undraw();
  const isAtLeftEdge = current.some(
    (index) => (currentPosition + index) % WIDTH === 0
  );

  // If we are not at the left edge, move right
  if (!isAtLeftEdge) {
    currentPosition -= 1;
  }

  // If we moved into taken space, move back
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition += 1;
  }

  draw();
}

function moveRight() {
  undraw();
  const isAtRightEdge = current.some(
    (index) => (currentPosition + index) % WIDTH === WIDTH - 1
  );

  // If we are not at the right edge, move right
  if (!isAtRightEdge) {
    currentPosition += 1;
  }

  // If we moved into taken space, move back
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition -= 1;
  }

  draw();
}
