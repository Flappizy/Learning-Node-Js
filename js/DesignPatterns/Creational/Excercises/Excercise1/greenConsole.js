import { ColorConsole } from "./colorConsole.js";

export class GreenConsole extends ColorConsole {
    constructor(color) {
        super('green', "\x1b[32m"); 
    }
}