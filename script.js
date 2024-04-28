const boardDiv = document.querySelector(".board")
const playerH2 = document.querySelector("#turn span")
let cells

const gameBoard = (function () {
    const board = []
    for (let i = 0; i < 3; i++) {
        board[i] = []
        for (let j = 0; j < 3; j++) {
            board[i][j] = "[ ]"
        }
    }
    return { board }
})()

function screenController() {
    let selRow
    let selCol

    const printBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("div")
                cell.innerText = ""
                cell.setAttribute("row", i + 1)
                cell.setAttribute("col", j + 1)
                cell.setAttribute("player", "none")
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

    const playerGuess = (cell) => {
        let guess = setGuess(cell)
        let turn = game.playerTurn(guess.selRow, guess.selCol)
        cell.innerText = turn.token
        if (turn.token === "X") {
            cell.setAttribute("player", "P1")
        }
        else {
            cell.setAttribute("player", "P2")
        }
        cell.removeEventListener("click", cellClick)
        game.changeTurn()
    }

    const setGuess = (guess) => {
        selRow = guess.getAttribute("row")
        selCol = guess.getAttribute("col")
        return { selRow, selCol }
    }

    return { printBoard, addListener, removeListener, setGuess }
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
        gameScreen.printBoard()
        gameScreen.addListener()
    }

    const changeTurn = () => {
        currentTurn == playersList[0] ? currentTurn = playersList[1] : currentTurn = currentTurn = playersList[0]
        playerH2.innerText = currentTurn.name
    }

    const playerTurn = (row, col) => {
        let guess = gameBoard.board[row - 1][col - 1]
        if (guess == "[ ]") {
            gameBoard.board[row - 1][col - 1] = `[${currentTurn.token}]`
            gameScreen.printBoard()
            if (gameLogic(gameBoard.board) == "win") {
                console.log(`${currentTurn.name} won the game!`)
                gameScreen.removeListener()
            }
        }
        else {
            console.log("Square already used, try again")
        }
        return currentTurn
    }

    return { playerTurn, newGame, changeTurn }
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





