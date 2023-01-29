class LoggerInstance{
    constructor(name) {
        this.count = 0;
        this.name = name;
    }

    log (message) {
        this.count++;
        console.log(`[${this.name} ${message}]`);
    }

}

module.exports = new LoggerInstance('Default');