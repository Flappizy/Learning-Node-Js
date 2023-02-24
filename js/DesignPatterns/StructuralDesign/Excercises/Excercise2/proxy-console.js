const logMethods = ['log', 'debug', 'info', 'error'];

const handler = {
    get: (target, prop) => {
        if (logMethods.includes(prop)) {
            return function(...args) {
                target[prop](`${new Date()}: ${args}`);
            }   
            
        }
        return target[prop];
    }
}

export const consoleProxy = new Proxy(console, handler);