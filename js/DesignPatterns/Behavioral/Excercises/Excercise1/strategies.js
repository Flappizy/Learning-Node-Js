import { promises as fs } from 'fs';

const filePath = 'file-log-messages.txt';

export const consoleStrategy = {
    debug: (level, message) => {
        console.debug(`${new Date()}: ${level}: ${message}\n`);
    },
    info: (level, message) => {
        console.debug(`${new Date()}: ${level}: ${message}\n`);
    },
    error: (level, message) => {
        console.debug(`${new Date()}: ${level}: ${message}\n`);
    },
    warn: (level, message) => {
        console.debug(`${new Date()}: ${level}: ${message}\n`);
    }
} 

export const fileStrategy = {
    debug: (level, message) => {
        fs.appendFile(filePath, `${new Date()}: ${level}: ${message}\n`, err => { if(err) throw err });
    },
    info:  (level, message) => {
        fs.appendFile(filePath, `${new Date()}: ${level}: ${message}\n`, err => { if(err) throw err });
    },
    error:  (level, message) => {
        fs.appendFile(filePath, `${new Date()}: ${level}: ${message}\n`, err => { if(err) throw err });
    },
    warn:  (level, message) => {
        fs.appendFile(filePath, `${new Date()}: ${level}: ${message}\n`, err => { if(err) throw err });
    }
}