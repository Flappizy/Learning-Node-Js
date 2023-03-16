export function timeStampedMiddleware(message) {
    return `${new Date}: ${message}`;
}