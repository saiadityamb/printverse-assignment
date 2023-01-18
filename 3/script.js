const statusDisplay = document.querySelector('.game--status');
let target = 15
let gameActive = true;
let currentPlayer = "X";
let elem = {
    turn:"",
    number:""
}
let gameState = [];
for(let i = 0;i<9;i++){
    gameState.push(elem)
}
let numbers = [1,2,3,4,5,6,7,8,9]
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

// const winningConditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ];
const winningConditions = {

    0:[[0,1,2],[0,3,6],[0,4,8]],
    1:[[0,1,2],[1,4,7]],
    2:[[0,1,2],[2,5,8],[2,4,6]],
    3:[[0,3,6],[3,4,5]],
    4:[[3,4,5],[1,4,7],[0,4,8],[2,4,6]],
    5:[[2,5,8],[3,4,5]],
    6:[[0,3,6],[6,7,8],[6,4,2]],
    7:[[1,4,7],[6,7,8]],
    8:[[0,4,8],[2,5,8],[6,7,8]],
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation(clickedCellIndex) {
    let roundWon = false;
    let locaWiningConditions = winningConditions[clickedCellIndex]
    for(let i = 0;i<locaWiningConditions.length;i++){
        const winCondition = locaWiningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if(a.number === '' || b.number === '' || c.number === '')
            continue;
        if(a.turn === currentPlayer && b.turn === currentPlayer && c.turn === currentPlayer){
              if(parseInt(a.number) + parseInt(b.number) + parseInt(c.number)  === target){
                roundWon = true;
               
                break
              }
        }
    }
    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        document.querySelectorAll('.cell-input').forEach(cell => cell.setAttribute("disabled",true));
        gameActive = false;
        return;
    }
    let roundDraw = false
    for(let i =0 ;i<gameState.length;i++){
        if(gameState[i].turn === ""){
            roundDraw = false
            break
        }
        else{
            roundDraw = true
        }
    }
    // const roundDraw = !gameState.includes({turn:"",number:""});
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    const inputClickedCell = clickedCell.value
    if (numbers.includes(parseInt(inputClickedCell))){
        if(currentPlayer == "X"){
            clickedCell.classList.add("white")
        }
        else{
            clickedCell.classList.add("red")

        }
        clickedCell.setAttribute("disabled",true)
        let index = numbers.indexOf(parseInt(inputClickedCell))
        numbers.splice(index,1)
        gameState[clickedCellIndex] = {
            turn:currentPlayer,
            number:inputClickedCell
        }
        console.log(gameState)
        handleResultValidation(clickedCellIndex);
        // console.log(numbers)
    }
    else if (parseInt(inputClickedCell) === 0){
        alert("Zero connot be used");
        clickedCell.value = ""
    }
    else{
        alert("number already used!")
        clickedCell.value = ""
    }
   
}

function handleRestartGame() {
window.location.reload()
}


document.querySelectorAll('.cell-input').forEach(cell => cell.addEventListener('input', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
