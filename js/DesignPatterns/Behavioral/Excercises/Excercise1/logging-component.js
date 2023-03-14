export class LoggingComponent {
    constructor(strategy) {
        this.strategy = strategy;
    }

    debug(message) {
       this.strategy.debug("DEBUG", message);
    }

    error(message) {
        this.strategy.error("ERROR", message);
    }

    warn(message) {
        this.strategy.warn("WARN", message);
    }

    info(message) {
        this.strategy.info("INFO", message);
    }
}