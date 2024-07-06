const boardElement = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const restartButton = document.getElementById('restart');
const messageElement = document.getElementById('message');

const PLAYER_X = 'X';
const PLAYER_O = 'O';
let currentPlayer = PLAYER_X;
let gameState = Array(9).fill(null);

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] !== null || checkWin()) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        messageElement.textContent = `${currentPlayer} wins!`;
    } else if (gameState.every(cell => cell !== null)) {
        messageElement.textContent = 'Draw!';
    } else {
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        if (currentPlayer === PLAYER_O) {
            makeAIMove();
        }
    }
}

function checkWin() {
    return WINNING_COMBINATIONS.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] === gameState[b] && gameState[b] === gameState[c] && gameState[a] !== null;
    });
}

function restartGame() {
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = PLAYER_X;
    messageElement.textContent = '';
}

function makeAIMove() {
    const emptyCells = gameState.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = PLAYER_O;
    cells[randomIndex].textContent = PLAYER_O;

    if (checkWin()) {
        messageElement.textContent = `${PLAYER_O} wins!`;
    } else if (gameState.every(cell => cell !== null)) {
        messageElement.textContent = 'Draw!';
    } else {
        currentPlayer = PLAYER_X;
    }
}

boardElement.addEventListener('click', handleClick);
restartButton.addEventListener('click', restartGame);
