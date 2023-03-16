export function consoleMiddleware(type) {
    return function(message) {
        console[type || 'log'](message);
        return message;
    }
}