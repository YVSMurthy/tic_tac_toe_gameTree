export class Grid {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getGridLines(n) {
        let gridLines = [];

        // Vertical lines
        for (let i = 1; i < n; i++) {
            let x = this.x + (i * this.width) / n;
            gridLines.push({
                x1: x,
                y1: this.y,
                x2: x,
                y2: this.y + this.height,
            });
        }

        // Horizontal lines
        for (let i = 1; i < n; i++) {
            let y = this.y + (i * this.height) / n;
            gridLines.push({
                x1: this.x,
                y1: y,
                x2: this.x + this.width,
                y2: y,
            });
        }

        return gridLines;
    }
}