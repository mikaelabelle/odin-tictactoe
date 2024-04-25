const gameBoard = (function () {
    const rowsAndCols = 3
    const board = []
    for (let i = 0; i < rowsAndCols; i++) {
        board[i] = []
        for (let j = 0; j < rowsAndCols; j++) {
            board[i][j] = "[ ]"
        }
    }

    const printBoard = () => {
        board.forEach(row => console.log(...row))
        console.log("===========")
    }

    return { printBoard, board }
})()

function gameController() {
    const playerTurn = (row, col) => {
        gameBoard.board[row - 1][col - 1] = "[X]"
        gameBoard.printBoard()
    }

    const createPlayer = (playerNum) => {
        const name = `Player ${playerNum}`
        return { name, playerNum }
    }

    const player1 = createPlayer(1)
    const player2 = createPlayer(2)

    return { playerTurn }
}

gameController()
gameBoard.printBoard()
gameController.playerTurn()
