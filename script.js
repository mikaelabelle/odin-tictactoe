const gameBoard = (function () {
    const rowsAndCols = 3
    const board = []
    for (let i = 0; i < rowsAndCols; i++) {
        board[i] = []
        for (let j = 0; j < rowsAndCols; j++) {
            board[i][j] = "[ ]"
        }
    }

    return { board }
})()

gameBoard.board.forEach(row => console.log(...row))