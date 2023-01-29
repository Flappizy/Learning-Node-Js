export class TaskQueuePC {
    constructor (concurrency) {
        this.taskQueue = []
        this.consumerQueue = []
        
        // spawn consumers
        for (let i = 0; i < concurrency; i++) {
            this.consumer()
        }
    }

    //Task runner
    async consumer () {
        while (true) { 
            try {
                const task = await this.getNextTask();
                await task();
            } catch (err) {
                console.error(err); 
            }
        }
    }

    async getNextTask () {
        return new Promise((resolve) => {
            if (this.taskQueue.length !== 0) {
                return resolve(this.taskQueue.shift());
            }
            this.consumerQueue.push(resolve);
        });
    }

    runTask (task) {
        return new Promise((resolve, reject) => {
            const taskWrapper = () => { // (1)
                const taskPromise = task();
                taskPromise.then(resolve, reject)
                return taskPromise
            }
            
            if (this.consumerQueue.length !== 0) { // (2)
                const consumer = this.consumerQueue.shift()
                consumer(taskWrapper)
            } else { // (3)
                this.taskQueue.push(taskWrapper)
            }
        })
    }
}    