import { Transform } from 'stream';

export class LimitedParallelStream extends Transform{
    constructor(concurrencyCount, userTransform, opts){
        super({ objectMode: true, ...opts });
        this.running = 0;
        this.userTransform = userTransform;
        this.terminateCb = null;
        this.concurrencyCount = concurrencyCount;
        this.continueCb = null;
    }

    _transform(chunk, encoding, done) {
        this.running++;
        this.userTransform(chunk, encoding, this.push.bind(this), this._onComplete.bind(this));
        if(this.running < this.concurrencyCount) {
            done();
        }
        else{
            this.continueCb = done;
        }
    }

    _flush(done) {
        if(this.running > 0) {
            this.terminateCb = done;
        }
        else{
            done();
        }
    }

    _onComplete(err) {
        this.running--;
        if(err) {
            return this.emit('error', err);
        }
        const tempCb = this.continueCb;
        this.continueCb = null;
        tempCb && tempCb();
        if(this.running === 0) {
            this.terminateCb && this.terminateCb();
        }
    }
}