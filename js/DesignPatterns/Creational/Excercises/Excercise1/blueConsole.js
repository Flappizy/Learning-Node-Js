import { ColorConsole } from "./colorConsole.js";

export class BlueConsole extends ColorConsole {
    constructor(color) {
        super('blue', "\x1b[34m");
    }
}