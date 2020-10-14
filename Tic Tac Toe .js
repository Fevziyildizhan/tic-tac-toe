<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <style type="text/css">
    *,*::after,*::before{
        box-sizing: border-box;


    }

   :root{
       --cell-size : 100px;
       --mark-size : calc(var(--cell-size)*.9)
   }



    body{
        margin: 0;

    }
    .board{
        width: 100vw;
        height: 100vh;
        display: grid;
        justify-content: center;
        align-content: center;
        justify-items: center;
        align-items: center;
        grid-template-columns: repeat(3,auto);
    }
    .cell{
        width: var(--cell-size);
        height: var(--cell-size);
         border: 1px solid black;
         display: flex;
         justify-content: center;
         align-items: center;
         position: relative;
         cursor: pointer;

    }
    .cell:first-child,
    .cell:nth-child(2),
    .cell:nth-child(3){
        border-top: none;

    }
 
    .cell.x,
    .cell.circle{
        cursor: not-allowed;
    }

    .cell:nth-child(3n + 1){
        border-left: none;
    }
    .cell:nth-child(3n + 3){
        border-right: none;
    }

    .cell:last-child,
    .cell:nth-child(8),
    .cell:nth-child(7){
        border-bottom: none;

    }
    .cell.x::before,
   .cell.x::after,
   .cell.circle::before{
      background-color: black;
   }


   
    .board.x.cell:not(.x):not(.circle) :hover::before,
    .board.x.cell:not(.x):not(.circle) :hover::after,
    .board.circle.cell:not(.x):not(.circle):hover::before {
         background-color: lightgrey;
    }

  

    .cell.x::before,
    .cell.x::after,
    .board.x .cell:not(.x):not(.circle) :hover::before,
    .board.x.cell:not(.x):not(.circle) :hover::after{
         content: '';
         position: absolute;
         width: calc(var(--mark-size)*.15);
         height: var(--mark-size);
         background-color: black;
    }

    .cell.x::before,
    .board.x.cell:not(.x):not(.circle) :hover::before{
        transform: rotate(45deg);
    }
    .cell.x::after,
    .board.x.cell:not(.x):not(.circle) :hover::after{
        transform: rotate(-45deg);
    }


    .cell.circle::before,
    .cell.circle::after,
    .board.circle.cell:not(.x):not(.circle):hover::before,
    .board.circle.cell:not(.x):not(.circle):hover::after{
         content: '';
         position: absolute;
         border-radius: 50%;
         background-color: black;
    }
   .cell.circle::before,
   .board.circle.cell:not(.x):not(.circle):hover::before {
    width: var(--mark-size);
         height: var(--mark-size);
       ;
   }
    
   .cell.circle::after,
   .board.circle.cell:not(.x):not(.circle):hover::after{
    width: calc(var(--mark-size)* .7);
    height: calc( var(--mark-size)* .7);
    background-color: white;
   }
   
   .winning-message{
       display: none;
       position: fixed;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       background-color: rgba(0,0,0,.9);
       
       justify-content: center;
       align-items: center;
       color:white;
       font-size: 5rem;
       flex-direction: column;
   }
   .winning-message button{
        font-size: 3rem;
        background-color: white;
        border: 1px solid black;
        padding: .25em .5em;
        cursor: pointer;
   }
   .winning-message button:hover{
       background-color: black;
       color: white;
       border-color:white ;

   }
   .winning-message.show{
       display: flex;

   }
    </style>
</head>
<body>
    
     <div class="board " id="board">
      <div class="cell " data-cell></div>
      <div class="cell " data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
     </div>
     <div class="winning-message " id="winningMessage">
       <div data-winnig-messenge-text></div>
       <button id="restartButton">YENİDEN</button>
     </div>
     <script src="Tic Tac Toe.js" type="text/javascript"></script>
</body>
</html>

const X_CLASS = 'x'
const CİRCLE_CLASS ='circle'
const WINNING_COMBINATIONS = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [0,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessangeElement = document.getElementById('winningMessage')
const restatButton = document.getElementById('restartButton')
const winningMessangeTextElement = document.querySelector('[data-winnig-messenge-text]')
let circleTurn;

startGame()

restatButton.addEventListener('click',startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CİRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{once:true})
    })
    setBoardHoverClass()
    winningMessangeElement.classList.remove('show')
}



function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CİRCLE_CLASS : X_CLASS
   placeMark(cell,currentClass)
   if(checkWin(currentClass)){
   endGame(false)
}else if(isDraw()){
    endGame(true)
}else{
    swapTurns()
    setBoardHoverClass()
    
}

   
   
}

function endGame(draw){
      if(draw){
        winningMessangeTextElement.innerText = 'BERABERE'
      } else{
          winningMessangeTextElement.innerText = `${circleTurn ? "O " : "X "} KAZANDI! ` 
      }
      winningMessangeElement.classList.add('show')
}


function isDraw(){
    return[ ...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CİRCLE_CLASS)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}


function swapTurns(){
  circleTurn = !circleTurn
}

function setBoardHoverClass(){
board.classList.remove(X_CLASS)
board.classList.remove(CİRCLE_CLASS)
if(circleTurn){
    board.classList.add(CİRCLE_CLASS)
}else{
    board.classList.add(X_CLASS)
}
}

function checkWin(currentClass){
 return WINNING_COMBINATIONS.some(combination => {
     return combination.every(index =>{
         return cellElements[index].classList.contains(currentClass)
     })
 })
}
