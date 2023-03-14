import { LoggerTemplate } from "./template-logger.js";

export class ConsoleLogger extends LoggerTemplate {
    _debug(message) {
        console.debug(`${new Date()}: DEBUG: ${message}`);
    }

    _info(message) {
        console.debug(`${new Date()}: INFO: ${message}`);
    }

    _error(message) {
        console.debug(`${new Date()}: ERROR: ${message}`);
    }

    _warn(message) {
        console.debug(`${new Date()}: WARN: ${message}`);
    }
}