const statusDisplay = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');
const newGameButton = document.getElementById('newGameButton');
const gameContainer = document.getElementById('gameContainer');
const resultContainer = document.getElementById('resultContainer');
const resultMessage = document.getElementById('resultMessage');
const cells = document.querySelectorAll('.cell');
const clickSound = document.getElementById('clickSound');
const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameCount = 1;

const winningMessage = () => `Congratulations🎉! Player ${currentPlayer} has won! Play Again`;
const drawMessage = () => "It's a draw! 🤝";
const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

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
  clickSound.play();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    resultMessage.innerHTML = winningMessage();
    recordResult(`Player ${currentPlayer}`);
    gameContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    resultMessage.innerHTML = drawMessage();
    recordResult('Draw');
    gameContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  cells.forEach(cell => cell.innerHTML = "");
  gameContainer.classList.remove('hidden');
  resultContainer.classList.add('hidden');
}

function recordResult(winner) {
  const newRow = resultsTable.insertRow();
  const gameCell = newRow.insertCell(0);
  const winnerCell = newRow.insertCell(1);

  gameCell.innerHTML = `Game ${gameCount++}`;
  winnerCell.innerHTML = winner;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
newGameButton.addEventListener('click', handleRestartGame);
