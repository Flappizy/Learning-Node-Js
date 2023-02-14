export class ColorConsole {
    constructor(color, terminalColor) {
        this.color = color;
        this.terminalColor = terminalColor;
    }

    log() {        
        console.log(this.terminalColor, `This is color ${this.color}`);
    }
}