export class Board {
    constructor(n) {
        this.board = new Array(n).fill().map(() => new Array(n).fill(0));
        this.n = n;
    }

    customeBoard(board) {
        this.board = board;
    }

    getElem(row, col) {
        return this.board[row][col];
    }

    updateBoard(row, col, val) {
        this.board[row][col] = val;
    }

    checkWinner(player) {
        // if all row ones same
        for (var i = 0; i < this.n; i++) {
            let flag = 1
            for (var j = 0; j < this.n; j++) {
                if (this.board[i][j] != player) {
                    flag = 0;
                    break;
                }
            }

            if (flag == 1) {
                return player;
            }
        }

        // if all column ones same
        for (var i = 0; i < this.n; i++) {
            let flag = 1
            for (var j = 0; j < this.n; j++) {
                if (this.board[j][i] != player) {
                    flag = 0;
                    break;
                }
            }

            if (flag == 1) {
                return player;
            }
        }

        // checking the main diagonal
        let flag = 1
        for (var j = 0; j < this.n; j++) {
            if (this.board[j][j] != player) {
                flag = 0;
                break;
            }
        }

        if (flag == 1) {
            return player;
        }

        // checking the secondary diagonal
        flag = 1
        for (var j = 0; j < this.n; j++) {
            if (this.board[this.n-1-j][j] != player) {
                flag = 0;
                break;
            }
        }

        if (flag == 1) {
            return player;
        }

        return 0;
    }

    isOver() {
        let count = 0;
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.board[i][j] == 0) {
                    count += 1;
                }
            }
        }

        return (count == 0);
    }
}