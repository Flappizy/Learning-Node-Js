import { promises as fs } from "fs";
import { LoggerTemplate } from "./template-logger.js";

const filePath = "file-log.txt";
export class FileLogger extends LoggerTemplate {
    _debug(message)  {
        fs.appendFile(filePath, `${new Date()}: DEBUG: ${message}\n`, err => { if(err) throw err });
    }

    _info(message) {
        fs.appendFile(filePath, `${new Date()}: INFO: ${message}\n`, err => { if(err) throw err });
    }

    _error(message) {
        fs.appendFile(filePath, `${new Date()}: ERROR: ${message}\n`, err => { if(err) throw err });
    }

    _warn(message) {
        fs.appendFile(filePath, `${new Date()}: WARN: ${message}\n`, err => { if(err) throw err });
    }
}