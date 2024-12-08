import { Grid } from './grid.js';
import { Cross, Circle } from './shapes.js';
import { Board } from './board.js'
import { GameTreeClassifier } from './gameTreeClassifier.js';

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


// making the tic tac toe board design ---------------------------------------------------------------------------------

let grid = new Grid(50, 50, 500, 500);
let gridLines = grid.getGridLines();
ctx.lineWidth = 3;

ctx.moveTo(gridLines.l1.x1, gridLines.l1.y1);
ctx.lineTo(gridLines.l1.x2, gridLines.l1.y2);

ctx.moveTo(gridLines.l2.x1, gridLines.l2.y1);
ctx.lineTo(gridLines.l2.x2, gridLines.l2.y2);

ctx.moveTo(gridLines.l3.x1, gridLines.l3.y1);
ctx.lineTo(gridLines.l3.x2, gridLines.l3.y2);

ctx.moveTo(gridLines.l4.x1, gridLines.l4.y1);
ctx.lineTo(gridLines.l4.x2, gridLines.l4.y2);

ctx.stroke();

// ---------------------------------------------------------------------------------------------------------------------
// constant declarations -----------------------------------------------------------------------------------------------

let cursor = {
    x: 0,
    y: 0
}
let chance = 1
let n = 3;

let board = (new Board(n)); 

// ---------------------------------------------------------------------------------------------------------------------
// updating current cursor positions dynamically -----------------------------------------------------------------------

canvas.addEventListener('mousemove', (event) => {
    let rect = canvas.getBoundingClientRect();
    cursor.x = event.clientX - rect.left;
    cursor.y = event.clientY - rect.top;
})

// ---------------------------------------------------------------------------------------------------------------------
// logic for displaying the X or O symbol if clicked on the canvas -----------------------------------------------------

canvas.addEventListener('mousedown', function addSymbol() {
    if (cursor.x >= grid.x && cursor.x <= grid.x+grid.width 
        && cursor.y >= grid.y && cursor.y <= grid.y+grid.height) {

        // finding the row and column offset
        let col = Math.floor(((cursor.x-grid.x) * 3) / grid.width);
        let row = Math.floor(((cursor.y-grid.y) * 3) / grid.width);

        // if that place is empty then only fill
        if (board.getElem(row, col) == 0) {

            // cross chance
            let shape1 = new Cross(50+(col*grid.width)/3, 50+(grid.width*row)/3, grid.width/3);
            let cross = shape1.getShape();

            ctx.moveTo(cross.l1.x1, cross.l1.y1);
            ctx.lineTo(cross.l1.x2, cross.l1.y2);
            ctx.moveTo(cross.l2.x1, cross.l2.y1);
            ctx.lineTo(cross.l2.x2, cross.l2.y2);
            ctx.stroke()

            board.updateBoard(row, col, chance);
            chance = -1;

            // check if cross wins
            // if winner, then stop the game and declare winner
            if (board.checkWinner(1) != 0) {
                console.log("Winner is Player 1");
                canvas.removeEventListener('mousedown',addSymbol)
                return;
            }
            // if the game draws
            else if (board.isOver()) {
                console.log("Draw");
                canvas.removeEventListener('mousedown',addSymbol)
                return;
            }


            // give a small gap to give nice thinking like gap
            setTimeout(() => {
                // Now circle (computer's chance)
                // find the best move for current scenario
                let gameTreeClassifier = new GameTreeClassifier(board.board, n);
                // calculating best move based on minimax
                gameTreeClassifier.minimax();
                let bestMove = gameTreeClassifier.getBestMoves();

                let shape2 = new Circle(50+(bestMove.col*grid.width)/3, 50+(grid.width*bestMove.row)/3, grid.width/3);
                let circle = shape2.getShape();

                ctx.beginPath();
                ctx.arc(circle.cx, circle.cy, circle.radius, 0, 2 * Math.PI);
                ctx.stroke();

                board.updateBoard(bestMove.row, bestMove.col, chance);
                chance = 1;

                // check if circle wins
                // if winner, then stop the game and declare winner
                if (board.checkWinner(-1) != 0) {
                    console.log("Winner is Computer");
                    canvas.removeEventListener('mousedown',addSymbol)
                    return;
                }
                // if the game draws
                else if (board.isOver()) {
                    console.log("Draw");
                    canvas.removeEventListener('mousedown',addSymbol)
                    return;
                }
            }, 1000)
        }
    }
})

// ---------------------------------------------------------------------------------------------------------------------
// logic for circle's chance