export class Grid {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    getGridLines(n) {
        let gridLines = {
            l1: {
                x1: this.x+this.width/n,
                y1: this.y,
                x2: this.x+this.width/n,
                y2: this.y+this.height
            },
        
            l2: {
                x1: this.x+(2*this.width)/n,
                y1: this.y,
                x2: this.x+(2*this.width)/n,
                y2: this.y+this.height
            },
        
            l3: {
                x1: this.x,
                y1: this.y+this.height/n,
                x2: this.x+this.width,
                y2: this.y+this.height/n
            },
        
            l4: {
                x1: this.x,
                y1: this.y+(2*this.height)/n,
                x2: this.x+this.width,
                y2: this.y+(2*this.height)/n
            }
        }

        return gridLines;
    }
}