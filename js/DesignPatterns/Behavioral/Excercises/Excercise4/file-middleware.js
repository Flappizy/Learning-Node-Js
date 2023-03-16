import { promises as fs } from "fs";

export function fileMiddleware(file, opts = {}) {
    return async function(message) {
        await fs.appendFile(file, message + '\n', opts);
        return message;
    }
}