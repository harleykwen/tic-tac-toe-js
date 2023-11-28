const boardSize = 3
const board = document.getElementById('board')
let currentPlayer = 'X'
let gameBoard = new Array(boardSize * boardSize).fill('')

function iniializeGame() {
    board.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.dataset.index = i
        cell.addEventListener('click', () => handleCellClick(i))
        board.appendChild(cell)
    }
}

function handleCellClick(index) {
    console.log({gameBoard})
    if (gameBoard[index] === '' && !checkWinner()) {
        gameBoard[index] = currentPlayer
        render()
        if (!checkWinner() && !gameBoard.includes('')) {
            alert('It\'s a draw!')
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    }
}

function render() {
    const cells = document.querySelectorAll('.cell')
    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index]
    })
}

function checkWinner() {
    const winningCombinations = getWinningCombinations()
    for (const combination of winningCombinations) {
        const [a, b, c] = combination
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            alert(`${gameBoard[a]} wins!`)
            return true
        }
    }
    return false
}

function getWinningCombinations() {
    const combinations = [];

    // Rows
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize - 2; j++) {
            combinations.push([i * boardSize + j, i * boardSize + j + 1, i * boardSize + j + 2])
        }
    }

    // Columns
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize - 2; j++) {
            combinations.push([j * boardSize + i, (j + 1) * boardSize + i, (j + 2) * boardSize + i])
        }
    }

    // Diagonals
    for (let i = 0; i < boardSize - 2; i++) {
        for (let j = 0; j < boardSize - 2; j++) {
            combinations.push([i * boardSize + j, (i + 1) * boardSize + j + 1, (i + 2) * boardSize + j + 2])
            combinations.push([(i + 2) * boardSize + j, (i + 1) * boardSize + j + 1, i * boardSize + j + 2])
        }
    }

    return combinations
}

iniializeGame()