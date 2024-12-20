import { Board } from './board.js'

export class GameTreeClassifier {
    // initialising the board
    constructor(board, n) {
        this.board = new Board(n);
        this.board.customeBoard(board);
        this.n = n;

        // initialising the output variable
        this.bestMove = {
            row: 0,
            col: 0
        }
    }

    // returning best moves
    getBestMoves() {
        return this.bestMove;
    }

    // mini-max algorithm ----------------------------------------------------------------------------------------------

    minimax(player = -1, depth = 3) {
        // Base case if depth is 0 or game is over
        let is_x = this.board.checkWinner(1);
        let is_o = this.board.checkWinner(-1);
        if (is_x == 1) return [1, depth]; // X wins
        if (is_o == -1) return [-1, depth]; // O wins
        if (this.board.isOver() || depth == 0) return [0, depth]; // Draw or max depth reached

        // Initialize variables for minimax
        let bestVal, bestDepth;
        if (player === -1) { // Minimize for O
            bestVal = Infinity; // values limited to -1,0,1 so max 2 works
            bestDepth = -1;
        } else { // Maximize for X
            bestVal = -Infinity; // limited to -1,0,1 so -2 works
            bestDepth = -1;
        }

        // Iterate through all possible moves
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.board.getElem(i, j) == 0) {
                    // Simulate move
                    this.board.updateBoard(i, j, player);

                    // Recursively calculate value and depth for the move
                    let [currVal, currDepth] = this.minimax(-player, depth - 1);

                    // Restore board state
                    this.board.updateBoard(i, j, 0);

                    if (player === -1) {
                        // for min, update if better move found, or maybe can prolongue the game
                        if (currVal < bestVal || (currVal === bestVal && currDepth > bestDepth)) {
                            bestVal = currVal;
                            bestDepth = currDepth;
                            this.bestMove.row = i;
                            this.bestMove.col = j;
                        }
                    } else {
                        // for max also, update if better move found, or maybe can prolongue the game
                        if (currVal > bestVal || (currVal === bestVal && currDepth > bestDepth)) {
                            bestVal = currVal;
                            bestDepth = currDepth;
                            this.bestMove.row = i;
                            this.bestMove.col = j;
                        }
                    }
                }
            }
        }

        return [bestVal, bestDepth];
    }

    // alpha beta pruning ----------------------------------------------------------------------------------------------

    alphabeta(player = -1, depth = 3, alpha = -Infinity, beta = Infinity) {
        // Base case if depth is 0 or game is over
        let is_x = this.board.checkWinner(1);
        let is_o = this.board.checkWinner(-1);
        if (is_x == 1) return [1, depth]; // X wins
        if (is_o == -1) return [-1, depth]; // O wins
        if (this.board.isOver() || depth == 0) return [0, depth]; // Draw or max depth reached

        // Initialize variables for minimax
        let bestVal, bestDepth;
        if (player === -1) { // Minimize for O
            bestVal = Infinity; // values limited to -1,0,1 so max 2 works
            bestDepth = -1;
        } else { // Maximize for X
            bestVal = -Infinity; // limited to -1,0,1 so -2 works
            bestDepth = -1;
        }

        // Iterate through all possible moves
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.board.getElem(i, j) == 0) {
                    // Simulate move
                    this.board.updateBoard(i, j, player);

                    // Recursively calculate value and depth for the move
                    let [currVal, currDepth] = this.alphabeta(-player, depth - 1, alpha, beta);

                    // Restore board state
                    this.board.updateBoard(i, j, 0);

                    if (player === -1) {
                        // for min, update if better move found, or maybe can prolongue the game
                        if (currVal < bestVal || (currVal === bestVal && currDepth > bestDepth)) {
                            bestVal = currVal;
                            bestDepth = currDepth;
                            this.bestMove.row = i;
                            this.bestMove.col = j;
                            beta = Math.min(beta, bestVal);
                        }
                    } else {
                        // for max also, update if better move found, or maybe can prolongue the game
                        if (currVal > bestVal || (currVal === bestVal && currDepth > bestDepth)) {
                            bestVal = currVal;
                            bestDepth = currDepth;
                            this.bestMove.row = i;
                            this.bestMove.col = j;
                            alpha = Math.max(alpha, bestVal);
                        }
                    }

                    // Prune branches
                    if (alpha >= beta) {
                        return [bestVal, bestDepth];
                    }
                }
            }
        }

        return [bestVal, bestDepth];
    }
}