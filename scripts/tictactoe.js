/*
GA SEI - Project 1 - Tic Tac Toe Game

Planning:

--- First iteration of the game will be for human vs human ---

Setup game board:
  1. Draw a grid that is 3 x 3
  2. Choose which player goes first

Define the rules of the game:
  1. player1 & player2 take alternating turns.
  2. Players cannot click on boxes that have been assigned already.
  3. If a player gets three in a row or column then they win the game.
  4. Otherwise its a draw.

During a players turn:
  1. When player1 clicks a box make it a 'o'
  2. When player2 clicks a box make it a 'x'
  3. Check if game is over

When game won:
  1. Visually identify which player has won
  2. Add to the winning players overall score to count rounds
  3. Reset the board for a new game
  4. player2 now goes first instead of player1.


--- Next steps: Make a CPU player! ---

Behaviour:
  CPU must compare positions to determine best move
  Give each potential position a rating and then do move with highest rating
*/


// Get DOM Objects
var gameContainer = document.querySelector(`.game-container`);
var boxes = document.querySelectorAll(`.game-container div`);
var playersTurnDisplay = document.querySelector('.players-turn span');
var gameStatus = document.querySelector('.game-status span');
var player1Score = document.querySelector('.player1-score span');
var player2Score = document.querySelector('.player2-score span');


var playerMove = function (row, column, marker) {  
  if (!roundWon) {
    console.log(`--BEGIN PLAYER MOVE--`)
    // check that array position is empty
    if (board[row][column] == '-') {
      // Update array with player marker
      board[row][column] = marker;
      // Update Colour
      event.target.style.background = players[currentPlayer].colour;
      console.table(board);
      console.log('Checking for a win:');
      checkWin()
    } else {
      console.log('Invalid move - position taken');
    }
    console.log(`--END PLAYER MOVE--`)
  }
}


var checkWin = function() {
  console.log('------ CHECKING ALL ROWS ------');
  checkRow();
  console.log('------ CHECKING ALL COLUMNS ------');
  checkColumn();
  console.log('------ CHECKING DIAGONALS ------');
  checkDiagonal();
}


var checkRow = function(){
  board.forEach(function(row){
    console.log(`Checking Row: ${row}`);
    var duplicateCounter = 0;
    var lastValue = '';
    row.forEach(function(currentValue){
      if (currentValue!= '-' && currentValue === lastValue) {
        duplicateCounter ++;
        if (duplicateCounter >= (marksInALineToWin - 1)) {
          console.log('* Match found *')
          gameWon();
        }
      } else {
        duplicateCounter = 0;
        console.log('Keep playing')
      }
      lastValue = currentValue;
    })
  })
}


var checkColumn = function() {
  for (col=0; col < boardWidth; col++) {
    // First make column array to check
    var currentColumn = [];
    for (row=0; row <= 2; row++) {
      currentColumn.push(board[row][col]);
    }
    console.log(`Checking Column Number: ${col}`)
    console.log(`Checking Column: ${currentColumn}`)

    var duplicateCounter = 0;
    var lastValue = '';
    currentColumn.forEach(function(currentValue){
      if (currentValue!= '-' && currentValue === lastValue) {
        duplicateCounter ++;
        if (duplicateCounter >= (marksInALineToWin - 1)) {
          console.log('* Match found *')
          gameWon();
        }
      } else {
        duplicateCounter = 0;
        console.log('Keep playing')
      }
      lastValue = currentValue;
    });
  }
}



var checkDiagonal = function() {

  // if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
  //   console.log('* Match found *');
  //   gameWon();
  // } else if(board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
  //   console.log('* Match found *');
  //   gameWon();
  // } else {
  //   console.log('Keep playing')
  // }
}




var gameWon = function() {
  console.log(`* ${currentPlayer} WINS THE ROUND *`);
  gameStatus.textContent = "Winner: " + currentPlayer;
  document.body.style.backgroundColor = "Gold";
  players[currentPlayer].score ++
  updateScores();
  roundWon = true;
}


var updateScores = function() {
  player1Score.textContent = players["Player 1"].score
  player2Score.textContent = players["Player 2"].score
}


var whosTurnIsIt = function (){
  if (clickCount % 2 == 0) {
    playersTurnDisplay.textContent = Object.keys(players)[0]
    return Object.keys(players)[0]
  } else {
    playersTurnDisplay.textContent = Object.keys(players)[1]
    return Object.keys(players)[1]
  }
}


var handleClick = function(event){
  currentPlayer = whosTurnIsIt()
  var clickedBoxId = event.target.dataset.number;
  console.log(`User Clicked Box: ${clickedBoxId}`)
  // Convert clickedBoxId to row & column
  var row = Number(clickedBoxId.toString()[0])
  var column = Number(clickedBoxId.toString()[1])
  // Player makes their move
  playerMove(row, column, players[currentPlayer].token)
  clickCount++;
}



var generateBoard = function(boardSize){
  var spaces = '-';
  var newBoard = []
  var boxCount = 1;
  // Setup console board
  for(i=0; i<boardSize; i++) {
    newBoard.push([]);

    for (j=0; j<boardSize; j++) {
    newBoard[i].push(spaces);

    // Render Board
    var newBox = document.createElement('div');
    newBox.dataset.number = i.toString()+j.toString();
    newBox.textContent = boxCount;
    boxCount++;
    gameContainer.appendChild(newBox);
    }
  }
  // renderBoard();
  return newBoard
}

// var renderBoard = function() {
//   var count = 1;
//   for (i=0; i<boardSize; i++) {
//     for (j=0; j<boardSize; j++) {

//       var newBox = document.createElement('div');
//       newBox.dataset.number = i.toString()+j.toString();
//       newBox.textContent = count;
//       count++;
//       gameContainer.appendChild(newBox);

//     }
//   }
// }

  // // create a new list item from input
  // var newTodoItem = document.createElement('li');
  // newTodoItem.classList.add('todo-item');
  // newTodoItem.textContent = newTodoInput.value;
  // // Tell new item to listen to click as well
  // newTodoItem.addEventListener('click', handleMarkComplete);
  // // Append new child to existing list
  // todoList.appendChild(newTodoItem);




console.log('------ BEGIN GAME ------');

var players = {
  'Player 1': {
    name: 'Dave',
    score: 0,
    token: 'X',
    colour: 'mistyrose'
  },
  'Player 2': {
    name: 'Stanley',
    score: 0,
    token: 'O',
    colour: 'lightblue'
  }
}


// hardcoded 3*3 board - update to dynamically generated later and match divs
// var board = [
//   ['-','-','-'],
//   ['-','-','-'],
//   ['-','-','-'],
// ];


var boardSize = 3;
var board = generateBoard(boardSize);
console.log(board)

var boardWidth = board[0].length;
var boardHeight = board.length;
var clickCount = 0;
var currentPlayer;
var marksInALineToWin = 3;
var roundWon = false;

// Event listeners
boxes.forEach(function(box){
  box.addEventListener('click', handleClick)
})


// Manual Testing
// playerMove(0,2,'O');
// playerMove(2,2,'X');
// playerMove(0,1,'O');
// playerMove(0,0,'X');
// playerMove(2,0,'X');
// playerMove(1,0,'O');
// playerMove(2,1,'X');
// playerMove(1,1,'X');