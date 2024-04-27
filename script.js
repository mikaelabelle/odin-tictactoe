const boardDiv = document.querySelector(".board")
let cells
let selRow
let selCol

const gameBoard = (function () {
    const board = []
    for (let i = 0; i < 3; i++) {
        board[i] = []
        for (let j = 0; j < 3; j++) {
            board[i][j] = "[ ]"
        }
    }

    const printBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameScreen.createBoard(i + 1, j + 1)
            }
        }

    }
    return { printBoard, board }
})()

function screenController() {
    const createBoard = (row, col) => {
        const cell = document.createElement("div")
        cell.innerText = ""
        cell.setAttribute("row", row)
        cell.setAttribute("col", col)
        cell.classList.add("cell")
        boardDiv.appendChild(cell)
    }

    return { createBoard }
}

function gameController() {
    const createPlayer = (playerNum, token) => {
        const name = `Player ${playerNum}`
        return { name, playerNum, token }
    }

    const player1 = createPlayer(1, "X")
    const player2 = createPlayer(2, "O")

    const playersList = [
        player1, player2
    ]

    let currentTurn = playersList[0]
    let winner = null

    const printTurn = () => {
        console.log(`${currentTurn.name}'s turn`)
    }

    const newGame = () => {
        gameBoard.printBoard()
        currentTurn = playersList[0]
        printTurn()
    }

    const playerTurn = (row, col) => {
        let guess = gameBoard.board[row - 1][col - 1]
        if (guess == "[ ]") {
            gameBoard.board[row - 1][col - 1] = `[${currentTurn.token}]`
            gameBoard.printBoard()
            if (gameLogic(gameBoard.board) == "win") {
                console.log(`${currentTurn.name} won the game!`)
            }
            else {
                currentTurn == playersList[0] ? currentTurn = playersList[1] : currentTurn = currentTurn = playersList[0]
                printTurn()
            }
        }
        else {
            console.log("Square already used, try again")
        }
    }

    return { playerTurn, newGame }
}

// TODO: game current keeps playing after win

function gameLogic(testB) {

    if (testB[0][0] == testB[1][1] && testB[1][1] == testB[2][2] && testB[0][0] != "[ ]") {
        return "win"
    }

    if (testB[0][2] == testB[1][1] && testB[1][1] == testB[2][0] && testB[0][2] != "[ ]") {
        return "win"
    }

    for (let i = 0; i < 3; i++) {
        if (testB[0][i] == testB[1][i] && testB[1][i] == testB[2][i] && testB[0][i] != "[ ]")
            return "win"
    }

    for (let i = 0; i < 3; i++) {
        if (testB[i][0] == testB[i][1] && testB[i][1] == testB[i][2] && testB[i][0] != "[ ]")
            return "win"
    }
}

const game = gameController()
const gameScreen = screenController()
game.newGame()

cells = document.querySelectorAll(".cell")
cells.forEach(cell => {
    cell.addEventListener("click", e => {
        setGuess(cell)
    })
});

const setGuess = (guess) => {
    selRow = guess.getAttribute("row")
    selCol = guess.getAttribute("col")
    console.log(selRow, selCol)
}

// straight row 1
// game.playerTurn(1, 1)
// game.playerTurn(2, 3)
// game.playerTurn(1, 3)
// game.playerTurn(2, 2)
// game.playerTurn(1, 2)

// diagonal
// game.playerTurn(1, 1)
// game.playerTurn(2, 3)
// game.playerTurn(2, 2)
// game.playerTurn(1, 2)
// game.playerTurn(3, 3)

// other diagonal
// game.playerTurn(1, 3)
// game.playerTurn(2, 3)
// game.playerTurn(2, 2)
// game.playerTurn(1, 2)
// game.playerTurn(3, 1)

// other diagonal
// game.playerTurn(1, 2)
// game.playerTurn(2, 3)
// game.playerTurn(2, 2)
// game.playerTurn(1, 1)
// game.playerTurn(3, 2)





