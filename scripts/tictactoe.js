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

*/


// Get DOM Objects
var gameContainer = document.querySelector(`.game-container`);
var boxes = document.querySelectorAll(`.game-container div`);
var playersTurnDisplay = document.querySelector('.players-turn span');
var gameStatus = document.querySelector('.game-status span');
var player1Score = document.querySelector('.player1-score span');
var player2Score = document.querySelector('.player2-score span');


var playerMove = function (row, column, marker) {  
  console.log(`BEGIN PLAYER MOVE`)
  // check that array position is empty
  if (board[row][column] == "") {
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
  console.log(`END PLAYER MOVE`)
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
    var foundMatchCount = 0;
    for(i=0; i<row.length; i++) {
      if(row[i] != "" && row[i] == row[i+1]){
        // reset counter if find a gap on larger boards
        foundMatchCount++;
      }
    }
    if (foundMatchCount == 2) {
      console.log('* Match found *')
      gameWon();
    } else {
      console.log('Keep playing')
    }
  })
}


var checkColumn = function() {
  for (col=0; col < boardWidth; col++) {
    var foundMatchCount = 0;
    var column = []; // only used for testing
    console.log(`Checking Column Number: ${col}`)
    for (row=0; row < boardHeight - 1; row++) {
      column.push(board[row][col]);
      if (board[row][col] != ""  &&  board[row][col] == board[row+1][col]) {
        foundMatchCount++;
      }
      // console.log(`Does "${board[row][col]}" = "${board[row+1][col]}" | Round ${row}`)
      // console.log(`matchCount = ${foundMatchCount}`)
    }
    column.push(board[row][boardHeight.length]) // Append last item
    console.log(`Checking Column ${column}`)
    if (foundMatchCount == 2) {
      console.log('* Match found *')
      gameWon();
    } else {
      console.log('Keep playing')
    }
  }
}


var checkDiagonal = function(){

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


var gameWon = function(){
  console.log(`* ${currentPlayer} WINS THE ROUND *`);
  gameStatus.textContent = "Winner: " + currentPlayer;
  document.body.style.backgroundColor = "Gold";
  players[currentPlayer].score ++
  updateScores();
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


console.log('------ BEGIN GAME ------');

var players = {
  'Player 1': {
    name: 'Dave',
    score: 0,
    token: 'X',
    colour: 'red'
  },
  'Player 2': {
    name: 'Stanley',
    score: 0,
    token: 'O',
    colour: 'blue'
  }
}

// hardcoded 3*3 board
var board = [
  ['','',''],
  ['','',''],
  ['','',''],
];

var boardWidth = board[0].length;
var boardHeight = board.length;
var clickCount = 0;
var currentPlayer;

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
