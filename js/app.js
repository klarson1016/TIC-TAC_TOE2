
/*-------------------------------- Constants --------------------------------*/
// player variables defined
const playerX = 1
const playerO = -1
//winning outcomes
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]


/*---------------------------- Variables (state)  ----------------------------*/
// declared empty array variables
let boardArray = [], playerXChoices = [], playerOChoices = []
//declared empty variables to be used globally 
let gameStatus, whoseTurn, winner


/*------------------------ Cached Element References ------------------------*/
const gameStatusDisplayLoc = document.getElementById('gameStatus')
// indivual board squares declared in an array
const squareArray = document.querySelectorAll('.boardpiece')
const resetBtn = document.querySelector('#reset-button')

/*----------------------------- Event Listeners -----------------------------*/
// used event listeners in render and init functions
/*-------------------------------- Functions --------------------------------*/

function init() {
 // declared board array to null with 9 indexes
  boardArray = [null, null, null, null, null, null, null, null, null]
  // declare player to start 
  whoseTurn = 1 //player x goes first
  //set winner to null
  winner = null 
  //added rest button here to allow user to start over at any point in the game
  resetBtn.addEventListener('click', resetBoard)
  render()
}
//render function inside the init function to render gameboard and dispalys on loading 
function render() {
  //assign an x or an O to the index that the player chooses
  squareArray.forEach((box, idx) => {
    //display X
    if (boardArray[idx] === 1) {
      box.innerHTML = 'X'
    } //display O
    else if(boardArray[idx] === -1) {
      squareArray[idx].innerHTML = 'O'
    }
    
    //display messages for results of the game
    if(winner === 'T') {
      gameStatusDisplayLoc.innerHTML = 'This is a tie'
    } else if(winner === null){
      gameStatusDisplayLoc.innerHTML = 'Player X turn '
    } else {
      gameStatusDisplayLoc.innerHTML = 'Winner Player ' + winner
    }
    // 
    box.addEventListener('click', handleClick)
      
   });
 
 }
 
 function handleClick(evnt) {
  // parseinT id of game board and start at index 2
  let boxId = parseInt((evnt.target.id).substring('2')) 
  //store player choices in an array
  if (boardArray[boxId] == null) {
    boardArray[boxId] = whoseTurn
    if(whoseTurn === -1){
      playerOChoices.push(boxId)
    } else {
      playerXChoices.push(boxId)
    }
    // check game results
    getWinner(whoseTurn)
    checkTie()
    whoseTurn *= -1
    render()
  } else {
    gameStatusDisplayLoc.innerHTML = 'invalid move choose again'
  }
 }
 
 function getWinner(whoseTurn){
  let checkArray = []
  console.log('whoseTurn ' + whoseTurn)
  if(whoseTurn === -1) {
    checkArray = playerOChoices
  } else {
    checkArray = playerXChoices
  }
 let foundWinner 
 // check for winner
 for (let i = 0; i < winningCombos.length; i++) {
    let combination = winningCombos[i]
    foundWinner = true
    combination.forEach(num=>{
      if(!checkArray.includes(num))
        foundWinner = false  
    })
    //check win combos to player turn to decied winner
    if(foundWinner && whoseTurn === 1){
      winner = 'X'
    } else if (foundWinner && whoseTurn === -1){
      winner = 'O'
    } 
  } 
 }
 function checkTie(){
  if (!boardArray.includes(null)){
    winner = "T"
  }
 }
 function resetBoard() {
  window.location.reload()  
 }
init()
