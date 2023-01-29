import { EventEmitter } from 'events';

export class TaskQueue extends EventEmitter {
    constructor(concurrency) {
        super();
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    runTask (task) {
        return new Promise((resolve, reject) => { // (1)
            this.queue.push(() => { // (2)
                return task().then(resolve, reject) // (4)
            })
            process.nextTick(this.next.bind(this)) // (3)
        })
    }
    
    next () {
        if (this.running === 0 && this.queue.length === 0) {
            return this.emit('empty');
        }

        while (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift();
            task().finally(() => {
                this.running--
                this.next()
            });
            this.running++;
        }
    }
}