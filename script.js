const boardDiv = document.querySelector(".board")
const playerH2 = document.querySelector("#turn")
const newGameBtn = document.querySelector("button")
let cells

const gameBoard = (function () {
    const board = []

    const makeBoard = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = []
            for (let j = 0; j < 3; j++) {
                board[i][j] = "[ ]"
            }
        }

    }
    makeBoard()
    return { board, makeBoard }
})()

function screenController() {
    let selRow
    let selCol

    newGameBtn.addEventListener("click", game.newGame)

    const printBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("div")
                cell.innerText = ""
                cell.setAttribute("row", i + 1)
                cell.setAttribute("col", j + 1)
                cell.setAttribute("player", "none")
                cell.setAttribute("game", "on")
                cell.classList.add("cell")
                boardDiv.appendChild(cell)
            }
        }
        cells = document.querySelectorAll(".cell")
    }

    const addListener = () => {
        cells.forEach(cell => {
            cell.addEventListener("click", cellClick)
        });
    }

    function cellClick(e) {
        playerGuess(this)
    }

    const removeListener = () => {
        cells.forEach(cell => {
            cell.removeEventListener("click", cellClick)
        })
    }

    const gameOver = (gameWinner) => {
        removeListener()
        if (gameWinner === "tie") {
            playerH2.innerText = `Game was a tie!`
        }
        else {
            playerH2.innerText = `${gameWinner} won the game!`
        }
        cells.forEach(cell => {
            cell.setAttribute("game", "over")
        })
    }

    const playerGuess = (cell) => {
        let guess = setGuess(cell)
        let turn = game.playerTurn(guess.selRow, guess.selCol)
        cell.innerText = turn.currentTurn.token
        if (turn.currentTurn.token === "X") {
            cell.setAttribute("player", "P1")
        }
        else {
            cell.setAttribute("player", "P2")
        }
        cell.removeEventListener("click", cellClick)

        if (turn.gameStatus === "not over") {
            game.changeTurn()
        }
    }

    const setGuess = (guess) => {
        selRow = guess.getAttribute("row")
        selCol = guess.getAttribute("col")
        return { selRow, selCol }
    }

    return { printBoard, addListener, setGuess, gameOver }
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

    const newGame = () => {
        boardDiv.innerHTML = ""
        gameBoard.makeBoard()
        gameScreen.printBoard()
        gameScreen.addListener()
        currentTurn = playersList[0]
        playerH2.innerText = `Current turn: ${currentTurn.name}`
    }

    const changeTurn = () => {
        currentTurn == playersList[0] ? currentTurn = playersList[1] : currentTurn = currentTurn = playersList[0]
        playerH2.innerText = `Current turn: ${currentTurn.name}`
    }

    const playerTurn = (row, col) => {
        let guess = gameBoard.board[row - 1][col - 1]
        let gameStatus
        if (guess == "[ ]") {
            gameBoard.board[row - 1][col - 1] = `[${currentTurn.token}]`
            gameStatus = gameLogic(gameBoard.board)
            if (gameStatus == "win") {
                gameScreen.gameOver(currentTurn.name)
            }
            else if (gameStatus == "tie") {
                gameScreen.gameOver(gameStatus)
            }
        }
        else {
            console.log("Square already used, try again")
        }
        return { currentTurn, gameStatus }
    }

    return { playerTurn, newGame, changeTurn }
}

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

    if (testB[0].includes("[ ]") === false && testB[1].includes("[ ]") === false && testB[2].includes("[ ]") === false) {
        return "tie"
    }

    return "not over"
}

const game = gameController()
const gameScreen = screenController()
game.newGame()





