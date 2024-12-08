class Shape {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.offset = 30;
    }
}

export class Cross extends Shape {
    constructor(x, y, size) {
        super(x,y,size)
    }

    getShape() {
        // calculating the value of the points in cross
        let cross = {
            l1: {
                x1: this.x+this.offset,
                y1: this.y+this.offset,
                x2: this.x+this.size-this.offset,
                y2: this.y+this.size-this.offset
            },

            l2: {
                x1: this.x+this.offset,
                y1: this.y+this.size-this.offset,
                x2: this.x+this.size-this.offset,
                y2: this.y+this.offset
            }
        };

        return cross;
    }
}

export class Circle extends Shape {
    constructor(x, y, size) {
        super(x,y,size)
    }

    getShape() {
        // calculating the value of circle parameters
        let circle = {
            cx: this.x+this.size/2,
            cy: this.y+this.size/2,
            radius: (this.size-2*this.offset)/2
        }

        return circle;
    }
}