import { Grid } from './grid.js';
import { Cross, Circle } from './shapes.js';
import { Board } from './board.js'
import { GameTreeClassifier } from './gameTreeClassifier.js';

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let winnerName = document.getElementById("winner");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn5 = document.getElementById("btn5");

// making the tic tac toe board design ---------------------------------------------------------------------------------

let grid = new Grid(50, 50, 500, 500);
let n = 3;
let board = new Board(n);
let chance = 1;
ctx.lineWidth = 2;
let cursor = { x: 0, y: 0 };

// function to create a new board and grid
function drawGrid(gridSize) {
    n = gridSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    winnerName.style.display = 'none';

    // Draw grid lines
    let gridLines = grid.getGridLines(n);
    gridLines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
    });

    // Reset the game state
    board = new Board(n);
    chance = 1;
}

// event listner attachment function -----------------------------------------------------------------------------------

function attachCanvasListeners() {
    // Remove any existing event listeners to avoid duplicates
    canvas.removeEventListener('mousedown', addSymbol);

    // Attach the event listener for handling clicks
    canvas.addEventListener('mousedown', addSymbol);
}

function startNewGame(gridSize) {
    drawGrid(gridSize);
    attachCanvasListeners();
}

// default game mode
startNewGame(3);

// updating current cursor positions dynamically -----------------------------------------------------------------------

canvas.addEventListener('mousemove', (event) => {
    let rect = canvas.getBoundingClientRect();
    cursor.x = event.clientX - rect.left;
    cursor.y = event.clientY - rect.top;
});

// logic for displaying the X or O symbol if clicked on the canvas -----------------------------------------------------

function addSymbol() {
    if (cursor.x >= grid.x && cursor.x <= grid.x + grid.width 
        && cursor.y >= grid.y && cursor.y <= grid.y + grid.height) {

        // Calculate row and column indices
        let col = Math.floor(((cursor.x - grid.x) * n) / grid.width);
        let row = Math.floor(((cursor.y - grid.y) * n) / grid.height);

        // Check if the cell is empty
        if (board.getElem(row, col) === 0) {
            // Draw cross for player
            let shape1 = new Cross(50 + (col * grid.width) / n, 50 + (grid.width * row) / n, grid.width / n);
            let cross = shape1.getShape();

            ctx.moveTo(cross.l1.x1, cross.l1.y1);
            ctx.lineTo(cross.l1.x2, cross.l1.y2);
            ctx.moveTo(cross.l2.x1, cross.l2.y1);
            ctx.lineTo(cross.l2.x2, cross.l2.y2);
            ctx.stroke();

            board.updateBoard(row, col, chance);
            chance = -1;

            // Check for winner or draw
            if (board.checkWinner(1) !== 0) {
                winnerName.textContent = "The winner is Player 1";
                winnerName.style.display = 'block';
                canvas.removeEventListener('mousedown', addSymbol);
                return;
            }
            if (board.isOver()) {
                winnerName.textContent = "DRAW";
                winnerName.style.display = 'block';
                canvas.removeEventListener('mousedown', addSymbol);
                return;
            }

            // Computer's turn
            setTimeout(() => {
                let gameTreeClassifier = new GameTreeClassifier(board.board, n);
                gameTreeClassifier.alphabeta();
                let bestMove = gameTreeClassifier.getBestMoves();

                let shape2 = new Circle(50 + (bestMove.col * grid.width) / n, 50 + (grid.width * bestMove.row) / n, grid.width / n);
                let circle = shape2.getShape();

                ctx.beginPath();
                ctx.arc(circle.cx, circle.cy, circle.radius, 0, 2 * Math.PI);
                ctx.stroke();

                board.updateBoard(bestMove.row, bestMove.col, chance);
                chance = 1;

                // Check for winner or draw
                if (board.checkWinner(-1) !== 0) {
                    winnerName.textContent = "The winner is Computer";
                    winnerName.style.display = 'block';
                    canvas.removeEventListener('mousedown', addSymbol);
                    return;
                }
                if (board.isOver()) {
                    winnerName.textContent = "DRAW";
                    winnerName.style.display = 'block';
                    canvas.removeEventListener('mousedown', addSymbol);
                    return;
                }
            }, 1000);
        }
    }
};

// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// event listners to dynamically change the grid size and game type ----------------------------------------------------

btn3.addEventListener('mousedown', () => {
    startNewGame(3);
})

btn4.addEventListener('mousedown', () => {
    startNewGame(4);
})

btn5.addEventListener('mousedown', () => {
    startNewGame(5);
})

// ---------------------------------------------------------------------------------------------------------------------
