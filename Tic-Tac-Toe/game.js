var board = {
  "a1": 0,
  "a2": 0,
  "a3": 0,
  "b1": 0,
  "b2": 0,
  "b3": 0,
  "c1": 0,
  "c2": 0,
  "c3": 0
}

var playingAs;
var computer;
var xWins;
var oWins;

$(document).ready(() =>{
  $('#newGame').on('click', () => {
    newGame();
  });
  runGame();
});

//Player chooses X or O
function runGame(){
  $('#playX').on('click', () =>{
    playingAs = 'X';
    computer = 'O';
    var xWins = 0;
    var oWins = 0;
    turn();
  });
  $('#playO').on('click', () =>{
    playingAs = 'O';
    computer = 'X';
    var xWins = 0;
    var oWins = 0;
    computerTurn(randomId());
  });
}

//Player's turn
function turn(){
  if(checkIfGameOver()){ setTimeout( () => { newGame(); }, 3000); }
  else{
    $('td').on('click', function(){
      if(checkIfEmpty(this.id)){
        $(this).html('<span class="filled">' + playingAs + '</span>');
        board[this.id] = playingAs;
        computerTurn(randomId());
      } else{ return; }
    });
  }
}

//Computer's turn
function computerTurn(x){
  if(checkIfGameOver()){ setTimeout( () => { newGame(); }, 3000); }
  else{
    if(checkIfEmpty(x)){
    $('#' + x).html('<span class="filled">' + computer + '</span>');
    board[x] = computer;
    turn();
  } else{ computerTurn(randomId()); }
  }
}

//Checks if the chosen square is empty
function checkIfEmpty(x){
  var isEmpty;
  board[x] === 0 ? isEmpty = true: isEmpty = false;
  return isEmpty;
}

//Picks a random square for the computer's move
function randomId(){
  var arr = Object.keys(board);
  var rand = arr[Math.floor(Math.random() * arr.length)];
  return rand;
}

//Displays message on win or lose
function displayMessage(num){
  const message = ["Winner, Winner, Chicken Dinner", "Sorry, try again"];
  $('#gameOver').text(message[num]);
  setTimeout( () => { $("#gameOver").text(''); }, 3000);
  setTimeout( () => { newGame(); }, 3000);
}

//Clears the board and resets the board object
function newGame(){
  var arr = Object.keys(board);
  arr.forEach( (el) =>{
    $('#' + el).text('');
  });

  board = { "a1": 0, "a2": 0, "a3": 0, "b1": 0, "b2": 0, "b3": 0, "c1": 0, "c2": 0, "c3": 0 };
}

//Checks if game is over
function checkIfGameOver(){
  var arr = Object.values(board);
  for(var i = 0; i < arr.length; i++){
    //player wins
    if(arr[0] === playingAs && arr[1] === playingAs && arr[2] === playingAs){ displayMessage(0); }
    if(arr[3] === playingAs && arr[4] === playingAs && arr[5] === playingAs){ displayMessage(0); }
    if(arr[6] === playingAs && arr[7] === playingAs && arr[8] === playingAs){ displayMessage(0); }
    if(arr[0] === playingAs && arr[3] === playingAs && arr[6] === playingAs){ displayMessage(0); }
    if(arr[1] === playingAs && arr[4] === playingAs && arr[7] === playingAs){ displayMessage(0); }
    if(arr[2] === playingAs && arr[5] === playingAs && arr[8] === playingAs){ displayMessage(0); }
    if(arr[0] === playingAs && arr[4] === playingAs && arr[8] === playingAs){ displayMessage(0); }
    if(arr[2] === playingAs && arr[4] === playingAs && arr[6] === playingAs){ displayMessage(0); }
    //computer wins
    if(arr[0] === computer && arr[1] === computer && arr[2] === computer){ displayMessage(1); }
    if(arr[3] === computer && arr[4] === computer && arr[5] === computer){ displayMessage(1); }
    if(arr[6] === computer && arr[7] === computer && arr[8] === computer){ displayMessage(1); }
    if(arr[0] === computer && arr[3] === computer && arr[6] === computer){ displayMessage(1); }
    if(arr[1] === computer && arr[4] === computer && arr[7] === computer){ displayMessage(1); }
    if(arr[2] === computer && arr[5] === computer && arr[8] === computer){ displayMessage(1); }
    if(arr[0] === computer && arr[4] === computer && arr[8] === computer){ displayMessage(1); }
    if(arr[2] === computer && arr[4] === computer && arr[6] === computer){ displayMessage(1); }
  }
  //Checks if there are any empty squares left
  var status;
  arr.includes(0) ? status = false: status = true;
  return status;
}
