/* global $, sessionStorage*/


////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// HTML jQuery Objects
var board = $("#board");
var scoreElement = $("#score");
var highScoreElement = $("#highScore");


// Game Variables
var score = 0; // variable to keep track of the score
var started = false; // variable to keep track of whether the game has started


// TODO 4, Part 1: Create the apple variable
var apple = {};


// TODO 5, Part 1: Create the snake variable
var snake = {};


// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;
var KEY = {
 LEFT: 37,
 UP: 38,
 RIGHT: 39,
 DOWN: 40,
};


// interval variable required for stopping the update function when the game ends
var updateInterval;


// variable to keep track of the key (keycode) last pressed by the user
var activeKey;


////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// TODO: turn on keyboard inputs
$("body").on("keydown", handleKeyDown);


// start the game
init();


function init() {
 board.empty();


 // TODO 5, Part 2: initialize the snake
 snake.body = [];
 makeSnakeSquare(10, 10);
 makeSnakeSquare(10, 9);
 makeSnakeSquare(10, 8);
 snake.head = snake.body[0];
 snake.head.direction = "right";


 // TODO 4, Part 3: initialize the apple
 makeApple();


 // TODO 6, Part 1: Initialize the interval
 updateInterval = setInterval(update, 100);


}


////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


/*
* On each update tick update the snake's position and check for
* collisions with the walls.
*/
function update() {
 // TODO 6, Part 2: Fill in the update function's code block
 if (started) {
   moveSnake();
 }


 if (hasHitWall() || hasCollidedWithSnake()) {
   endGame();
 }


 if (hasCollidedWithApple()) {
   handleAppleCollision();
 }
}


function checkForNewDirection() {
}


function checkForNewDirection(event) {
 /*
 TODO 7: Update snake.head.direction based on the value of activeKey.


  BONUS: Only allow direction changes to take place if the new direction is
 perpendicular to the current direction
 */

  if (activeKey === KEY.LEFT) {
   snake.head.direction = "left";
 } else if (activeKey === KEY.RIGHT) {
   snake.head.direction = "right";
 } else if (activeKey === KEY.UP) {
   snake.head.direction = "up";
 } else if (activeKey === KEY.DOWN) {
   snake.head.direction = "down";
 }
}




function moveSnake() {
 /*
   TODO 10: Move each part of the snake's body such that it's body follows the head.
  
   HINT: To complete this TODO we must figure out the next direction, row, and
   column for each snakeSquare in the snake's body. The parts of the snake are
   stored in the Array snake.body and each part knows its current
   column/row properties.
 */


 for (var i = snake.body.length - 1; i > 0; i--) {
   var currentSnakeSquare = snake.body[i];
   var snakeSquareInFront = snake.body[i - 1];


   moveBodyAToBodyB(currentSnakeSquare, snakeSquareInFront);
   repositionSquare(currentSnakeSquare);
 }
 //Before moving the head, check for a new direction from the keyboard input
 checkForNewDirection();


 /*
   TODO 8: determine the next row and column for the snake's head
  
   HINT: The snake's head will need to move forward 1 square based on the value
   of snake.head.direction which may be one of "left", "right", "up", or "down"
 */
 if (snake.head.direction === "left") {
   snake.head.column--;
 } else if (snake.head.direction === "right") {
   snake.head.column++;
 } else if (snake.head.direction === "up") {
   snake.head.row--;
 } else if (snake.head.direction === "down") {
   snake.head.row++;
 }

 repositionSquare(snake.head);
}


// TODO 9: Create a new helper function
function moveBodyAToBodyB(bodyA, bodyB) {
 bodyA.row = bodyB.row;
 bodyA.column = bodyB.column;
}


function hasHitWall() {
 /*
   TODO 11: Should return true if the snake's head has collided with the four walls of the
   board, false otherwise.
  
   HINT: What will the row and column of the snake's head be if this were the case?
 */
 return (
   snake.head.row < 0 ||
   snake.head.row >= ROWS ||
   snake.head.column < 0 ||
   snake.head.column >= COLUMNS
 );
}


function hasCollidedWithApple() {
 /*
   TODO 12: Should return true if the snake's head has collided with the apple, 
   false otherwise
    
   HINT: Both the apple and the snake's head are aware of their own row and column
 */
 return (
   snake.head.row === apple.row &&
   snake.head.column === apple.column
 );
}


function handleAppleCollision() {
 score++;
 scoreElement.text("Score: " + score);


 apple.element.remove();
 makeApple();


 var row = snake.tail.row;
 var column = snake.tail.column;
 makeSnakeSquare(row, column);
}


function hasCollidedWithSnake() {
 /*
   TODO 13: Should return true if the snake's head has collided with any part of the
   snake's body.
    
   HINT: Each part of the snake's body is stored in the snake.body Array. The
   head and each part of the snake's body also knows its own row and column.
 */
 for (var i = 1; i < snake.body.length; i++) {
   if (
     snake.head.row === snake.body[i].row &&
     snake.head.column === snake.body[i].column
   ) {
     return true;
   }
 }
 return false;
}


function endGame() {
 clearInterval(updateInterval);
 started = false;
 board.empty();


 highScoreElement.text("High Score: " + calculateHighScore());
 scoreElement.text("Score: 0");
 score = 0;


 setTimeout(init, 500);
}


////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


/* Create an HTML element for the apple using jQuery. Then find a random
* position on the board that is not occupied and position the apple there.
*/
function makeApple() {
 apple.element = $("<div>").addClass("apple").appendTo(board);

 var randomPosition = getRandomAvailablePosition();
 apple.row = randomPosition.row;
 apple.column = randomPosition.column;

 repositionSquare(apple);
}


function makeSnakeSquare(row, column) {
 var snakeSquare = {};
 snakeSquare.element = $("<div>").addClass("snake").appendTo(board);
 snakeSquare.row = row;
 snakeSquare.column = column;

 repositionSquare(snakeSquare);

 if (snake.body.length === 0) {
   snakeSquare.element.attr("id", "snake-head");
 }

 snake.body.push(snakeSquare);
 snake.tail = snakeSquare;
}


function handleKeyDown(event) {
 activeKey = event.which;

 if (
   event.which === KEY.LEFT ||
   event.which === KEY.RIGHT ||
   event.which === KEY.UP ||
   event.which === KEY.DOWN
 ) {
   started = true;
 }
}


function repositionSquare(square) {
 var buffer = 20;
 square.element.css("left", square.column * SQUARE_SIZE + buffer);
 square.element.css("top", square.row * SQUARE_SIZE + buffer);
}


function getRandomAvailablePosition() {
 var spaceIsAvailable = false;
 var randomPosition = {};

 while (!spaceIsAvailable) {
   randomPosition.column = Math.floor(Math.random() * COLUMNS);
   randomPosition.row = Math.floor(Math.random() * ROWS);
   spaceIsAvailable = true;

   for (var i = 0; i < snake.body.length; i++) {
     if (
       snake.body[i].row === randomPosition.row &&
       snake.body[i].column === randomPosition.column
     ) {
       spaceIsAvailable = false;
     }
   }
 }

 return randomPosition;
}


function calculateHighScore() {
 var highScore = sessionStorage.getItem("highScore") || 0;

 if (score > highScore) {
   sessionStorage.setItem("highScore", score);
   highScore = score;
 }

 return highScore;
}
