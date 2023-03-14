export function createTask(target, ...args) {
    return () => {
        target(...args);
    }
}