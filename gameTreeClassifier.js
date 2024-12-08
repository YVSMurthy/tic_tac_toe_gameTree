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

    minimax(player = -1, depth = 2) {
        // base case
        // if depth is 0, last level, then calculate the winner assignment values
        if (depth == 0) {
            let is_x = this.board.checkWinner(1);
            let is_o = this.board.checkWinner(-1);
            return (is_x == 1) ? 1 : (is_o == -1) ? -1 : 0;
        }

        else {
            // if there is already a winner
            let is_x = this.board.checkWinner(1);
            let is_o = this.board.checkWinner(-1);
            if (is_x == 1) {
                return 1;
            }
            else if (is_o == -1) {
                return -1;
            }

            // gave over with a draw
            if (this.board.isOver()) {
                return 0;
            }

            // game not ended till now
            // min case (O chance)
            if (player == -1) {
                let min_val = 2; // as value limited to -1, 0, 1 so assignment to 2 works
                for (let i = 0; i < this.n; i++) {
                    for (let j = 0; j < this.n; j++) {
                        if (this.board.getElem(i,j) == 0) {
                            // if empty, update the board
                            this.board.updateBoard(i, j, -1);

                            // recursively call minimax function with next player
                            let curr_val = this.minimax(1, depth-1);
                            if (curr_val < min_val) {
                                min_val = curr_val;
                                this.bestMove.row = i;
                                this.bestMove.col = j;
                            }

                            // reverting back the changes to the board
                            this.board.updateBoard(i, j, 0);
                        }
                    }
                }

                return min_val;
            }

            else {
                let max_val = -2; // as value limited to -1, 0, 1 so assignment to -2 works
                for (let i = 0; i < this.n; i++) {
                    for (let j = 0; j < this.n; j++) {
                        if (this.board.getElem(i,j) == 0) {
                            // if empty, update the board
                            this.board.updateBoard(i, j, 1);

                            // recursively call minimax function with next player
                            let curr_val = this.minimax(-1, depth-1);
                            if (curr_val > max_val) {
                                max_val = curr_val;
                                this.bestMove.i = i;
                                this.bestMove.j = j;
                            }

                            // reverting back the changes to the board
                            this.board.updateBoard(i, j, 0);
                        }
                    }
                }

                return max_val;
            }
        }
    }

    // --------------------------------------------------------------------------------------------------------------------
}