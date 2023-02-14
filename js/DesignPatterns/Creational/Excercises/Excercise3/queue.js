export class Queue {
    constructor(executor) {
        this.queue = [];
        this.resolves = [];

        const enqueue = (item) => {
            this.queue.push(item);
            if (this.resolves.length > 0) {
                const pendingResolve = this.resolves.shift();
                pendingResolve(this.queue.shift());
            }
        }

        executor(enqueue);
    }

    dequeue() {
        if(this.queue.length > 0) {
            const item = this.queue.shift();
            return Promise.resolve(item);
        }

        return new Promise((resolve, reject) => {
            this.resolves.push(resolve);
        });
    }
}