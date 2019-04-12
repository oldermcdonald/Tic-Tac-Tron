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
var boardSizeInput = document.querySelector('.board-size-input');
var winStreakInput = document.querySelector('.win-streak-input');
var configureButton = document.querySelector('.config-btn');


var playerMove = function (row, column, marker) {  
  if (!roundWon) {
    console.log(`--BEGIN PLAYER MOVE--`)
    // check that array position is empty
    if (board[row][column] == spaces) {
      // Update array with player marker
      board[row][column] = marker;
      // Swap to other player
      clickCount++;
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
  console.log('---- CHECKING ROWS ----');
  checkRow();
  console.log('---- CHECKING COLUMNS ----');
  checkColumn(boardSize, board);
  console.log('--- CHECKING DIAGONALS ---');
  checkDiagonalDecending();
  checkDiagonalAcending();
}


var checkRow = function(){
  board.forEach(function(row){
    console.log(`Checking Row: ${row}`);
    var duplicateCounter = 0;
    var lastValue = '';
    row.forEach(function(currentValue){
      if (currentValue!= spaces && currentValue === lastValue) {
        duplicateCounter ++;
        if (duplicateCounter >= (numMatchesRequired - 1)) {
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


var checkColumn = function(numCols, board) {
  for (col=0; col < numCols; col++) {
    // First make column array to check
    var currentColumn = [];
    for (row=0; row <= boardSize -1 ; row++) {
      currentColumn.push(board[row][col]);
    }
    console.log(`Checking Column Number: ${col}`)
    console.log(`Checking Column: ${currentColumn}`)

    var duplicateCounter = 0;
    var lastValue = '';
    currentColumn.forEach(function(currentValue){
      if (currentValue!= spaces && currentValue === lastValue) {
        duplicateCounter ++;
        if (duplicateCounter >= (numMatchesRequired - 1)) {
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


// Just swapped push and shift to reverse (refactor later)
var checkDiagonalAcending = function() {
  // 1. Make a copy of the original board ready to shift
  var boardShifted = [];
  board.forEach(function(row){
    boardShifted.push(row.slice(0));
  })
  // 2. Calculate number of columns once board has been shifted
  var shiftedColumns = (boardSize * 2)-1;
  // 3. Shift the array by adding blanks
  var frontAdd = boardSize;
  var endAdd = 0;
  for (i=0; i < boardSize; i++){
    // Add spaces to front of array
    for (j=0; j < frontAdd - 1; j++){
      boardShifted[i].push(spaces);
    }
    frontAdd--;
    // Add spaces to end of array
    for (k=0; k < endAdd; k++){
      if (i > 0) {
        boardShifted[i].unshift(spaces);
      }
    }
    endAdd++;
  }
  console.table(board);
  console.table(boardShifted)
  // Then run checkColumn() on the shifted array
  checkColumn(shiftedColumns, boardShifted);
}


var checkDiagonalDecending = function() {
  // 1. Make a copy of the original board ready to shift
  var boardShifted = [];
  board.forEach(function(row){
    boardShifted.push(row.slice(0));
  })
  // 2. Calculate number of columns once board has been shifted
  var shiftedColumns = (boardSize * 2)-1;
  // 3. Shift the array by adding blanks
  var frontAdd = boardSize;
  var endAdd = 0;
  for (i=0; i < boardSize; i++){
    // Add spaces to front of array
    for (j=0; j < frontAdd - 1; j++){
      boardShifted[i].unshift(spaces);
    }
    frontAdd--;
    // Add spaces to end of array
    for (k=0; k < endAdd; k++){
      if (i > 0) {
        boardShifted[i].push(spaces);
      }
    }
    endAdd++;
  }
  console.table(board);
  console.table(boardShifted)
  // Then run checkColumn() on the shifted array
  checkColumn(shiftedColumns, boardShifted);
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

var resetScores = function(){
  players["Player 1"].score = 0;
  players["Player 2"].score = 0;
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


var generateBoard = function(boardSize){
  var newBoard = [];
  var boxCount = 1;
  spaces = '-';
  // Remove previous classes
  gameContainer.classList.removeChild;
  gameContainer.className='game-container';
  // Setup console board
  for(i=0; i<boardSize; i++) {
    newBoard.push([]);
    for (j=0; j<boardSize; j++) {
      newBoard[i].push(spaces);
      // Render Board on DOM
      var newBox = document.createElement('div');
      newBox.dataset.number = i.toString()+j.toString();
      // Add number to box
      // newBox.textContent = boxCount;
      // Make new boxes listen
      newBox.addEventListener('click', handleClick);
      gameContainer.appendChild(newBox);
      boxCount++;
      // Append size class to box
      if (boardSize == 3){
        gameContainer.classList.add('three');
      } else if (boardSize == 4 ){
        gameContainer.classList.add('four');      
      } else if (boardSize == 5 ){
        gameContainer.classList.add('five')
      } else if (boardSize == 6) {
        gameContainer.classList.add('six')
      }
    }
  }
  return newBoard
}


var handleClick = function(event){
  var clickedBoxId = event.target.dataset.number;
  console.log(`User Clicked Box: ${clickedBoxId}`)
  // Convert clickedBoxId to row & column
  var row = Number(clickedBoxId.toString()[0])
  var column = Number(clickedBoxId.toString()[1])
  // Player makes their move
  currentPlayer = whosTurnIsIt()
  playerMove(row, column, players[currentPlayer].token)

}


var newGame = function() {
  console.log('new game click')
  // Clear existing game container divs
  while (gameContainer.hasChildNodes()){
    gameContainer.removeChild(gameContainer.lastChild);
  }

  // Reset DOM elements
  gameStatus.textContent = "";
  document.body.style.backgroundColor = "transparent";

  // resetScores();
  // updateScores();

  roundWon = false;
  // Reset all counters
  clickCount = 0;
  // Get user configurations
  numMatchesRequired = winStreakInput.value;
  // Generate a new board
  boardSize = boardSizeInput.value;
  board = generateBoard(boardSize)
}

console.log('---- BEGIN GAME ----');

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

// Declare Global Variables
var boardSize = boardSizeInput.value;
var spaces;
var clickCount = 0;
var currentPlayer;
var numMatchesRequired = winStreakInput.value;
var roundWon = false;

// Generate initial board
var board = generateBoard(boardSize);




// Event listeners
boxes.forEach(function(box){box.addEventListener('click', handleClick)});
configureButton.addEventListener('click', newGame);
