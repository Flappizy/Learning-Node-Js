const writableHandler = {
    get: (target, prop) => {
        if (prop === 'write') {
            return function(...args) {
                const [chunk] = args;
                console.log(`Writing ${chunk}`);
                return target.write(...args);
            }
        }

        return target[prop];
    }
}

export function createLoggingWritable(writable) {
    return new Proxy(writable, writableHandler);
}