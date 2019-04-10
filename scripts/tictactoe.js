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

During a players turn:
  1. When player1 clicks a box make it a 'o'
  2. When player2 clicks a box make it a 'x'
  3. Check if game is over

When game won:
  1. Visually identify which player has won OR if no winner then TIE
  2. Add to the winning players overall score to count rounds
  3. Reset the board for a new game
  4. player2 now goes first instead of player1.


--- Next steps: Make a CPU player! ---
Behaviour:
  CPU must compare positions to determine best move

*/


var board = [
  ['','',''],
  ['','',''],
  ['','','']
];

console.log('------ BEGIN GAME ------');

var boardWidth = board[0].length;
var boardHeight = board.length;


var playerMove = function (row, column, marker) {
  // check that array position is empty
  if (board[row][column] == "") {
    // Update array with player marker
    console.log(`BEGIN PLAYER MOVE`)
    board[row][column] = marker;
    console.table(board);
    console.log('Checking for a win:');
    checkWin()

  } else {
    console.log('position taken');
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

    var matchCounter = 0;
    for(i=0; i<row.length; i++) {
      if(row[i] != "" && row[i] == row[i+1]){
        matchCounter++;
      }
    }
    if (matchCounter == 2) {
      console.log('* Match found *')
    } else {
      console.log('Keep playing')
    }
  })
}


var checkColumn = function() {
  for (col=0; col < boardWidth; col++) {
    var matchCounter = 0;
    var column = [];
    // console.log(`Checking Column Number: ${col}`)
    for (row=0; row < boardHeight - 1; row++) {
      column.push(board[row][col]);
      if (board[row][col] != ""  &&  board[row][col] == board[row+1][col]) {
        matchCounter++;
      }
      // console.log(`Does "${board[row][col]}" = "${board[row+1][col]}" | Round ${row}`)
      // console.log(`matchCount = ${matchCounter}`)
    }
    column.push(board[row][boardHeight.length]) // Append last item
    console.log(`Checking Column ${column}`)

    if (matchCounter == 2) {
      console.log('* Match found *')
    } else {
      console.log('Keep playing')
    }
  }
}



var checkDiagonal = function(){
  // Hardcoded
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
    console.log('* Match found *');
  } else if(board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
    console.log('* Match found *');
  } else {
    console.log('Keep playing')
  }
}


playerMove(0,2,'O');
playerMove(2,2,'X');
playerMove(0,1,'O');
playerMove(0,0,'X');
playerMove(2,0,'X');
playerMove(1,0,'O');
playerMove(2,1,'X');
playerMove(1,1,'X');
