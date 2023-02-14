import { ColorConsole } from "./colorConsole.js";

export class RedConsole extends ColorConsole {
    constructor() {
        super('red', "\x1b[31m");        
    }
}