const statusDisplay = document.getElementsByClassName('gameStatus')[0];
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            let [winCell_1, winCell_2, winCell_3] = winningConditions[i]
            let childrenCollection = document.getElementsByClassName("gameContainer")[0].children
            for (let i = 0; i < childrenCollection.length; i++) {
                if ((Number(childrenCollection[i].getAttribute('data-cell-index')) === winCell_1) ||
                    (Number(childrenCollection[i].getAttribute('data-cell-index')) === winCell_2) ||
                    (Number(childrenCollection[i].getAttribute('data-cell-index')) === winCell_3)) {
                    childrenCollection[i].classList.add("winCellBackground")
                }
            }
            break;
        }
    }

    if (roundWon) {
        statusDisplay.classList.add("resualt");
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.classList.add("resualt");
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Number(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
    RobotPlayer(currentPlayer);
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

function RobotPlayer(currentPlayer) {
    let emptyCellesIndexes = [];
    if (currentPlayer === "O") {
        gameState.forEach((cell, cellIndex) =>{
            if(cell === ""){
                emptyCellesIndexes.push(cellIndex);
            }
        })
                randomEmptyCell = Math.floor(Math.random() * emptyCellesIndexes.length);

    }
    console.log(emptyCellesIndexes);

}

document.getElementsByClassName('gameContainer')[0].addEventListener('click', handleCellClick);
document.getElementsByClassName('gameRestart')[0].addEventListener('click', handleRestartGame);