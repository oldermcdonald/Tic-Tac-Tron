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



// var board = [
//   ['1','2','3'],
//   ['4','5','6'],
//   ['7','8','9']
// ];

var board = [
  ['','',''],
  ['','',''],
  ['','','']
];

console.log('Begin game');

var playerMove = function (row, column, marker){
  board[row][column] = marker; // replace with player marker
  console.table(board);
  console.log('Checking for a win:');
  checkWin()
}



var checkWin = function(){
  board.forEach(function(row){
    console.log('Checking - each row');
    console.log(row);
    var matchCounter = 0;

    for(i=0; i<row.length; i++) {
      if(row[i] != "" && row[i] == row[i+1]){
        matchCounter++;
      }
    }

    if (matchCounter == 2) {
      console.log('Row match!!')
    } else {
      console.log('No row match')
    }
  })


  console.log('Checking - each column');

  console.log('Checking - both diagonals');

  console.log('Notify if game won or keep going');

}


playerMove(0,2,'O');
playerMove(0,0,'O');
playerMove(2,2,'X');
playerMove(0,1,'O');
playerMove(1,2,'X');
