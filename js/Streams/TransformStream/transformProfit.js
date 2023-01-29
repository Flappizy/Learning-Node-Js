import { Transform } from 'stream';

export class SumProfit extends Transform {
    constructor(options = {}) {
        options.objectMode = true;
        super(options);
        this.total = 0;
    }

    _transform(record, encoding, cb) {
        this.total += Number.parseFloat(record.profit);
        cb();
    }

    //The flush method is automatically invoked before the stream is closed, so in most cases it used to perform
    //on final task before the stream is closed
    _flush(cb) {
        this.push(this.total.toString());
        cb();
    }
}