export class TaskQueueIterator {
    constructor() {
        this.tasks = [];
    }

    enqueue(task) {
        this.tasks.push(task);
    }

    [Symbol.asyncIterator]() {
        const iterator = this.tasks[Symbol.iterator]();

        return {
            async next() {
                const iterationResult = iterator.next();

                if (iterationResult.done) {
                    return { done: true };
                }

                try {
                    const currentTask = await iterationResult.value;
                    return { done: false, value: currentTask() }   
                } catch (error) {
                    return { done: false, value: error };
                }
            }
        }
    }
}