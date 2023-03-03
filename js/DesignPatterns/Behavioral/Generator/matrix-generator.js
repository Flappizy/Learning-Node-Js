export class Matrix {
    constructor(data) {
        this.data = data;
    }

    get(row, column) {
        if (row > this.data.length - 1 || column > this.data[row].length - 1) {
            throw new RangeError('Out of bound');
        }
        return this.data[row][column];
    }

    set(row, column, value) {
        if (row > this.data.length - 1 || column > this.data[row].length - 1) {
            throw new RangeError('Out of bound');
        }
        this.data[row][column] = value;
    }

    [Symbol.iterator]() {
        let currRow = 0;
        let currCol = 0;

        while (currRow <= this.data.length - 1) {
            yield this.data[currRow][currCol];
            if (currCol === this.data[currRow].length - 1) {
                currRow++;
                currCol = 0;
            } else {
                currCol++;
            }
        }
    }
}