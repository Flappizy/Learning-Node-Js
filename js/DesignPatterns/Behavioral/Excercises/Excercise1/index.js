import { LoggingComponent } from "./logging-component.js";
import { consoleStrategy, fileStrategy } from "./strategies.js";

//log messages to the console
const consoleLoggingComponent = new LoggingComponent(consoleStrategy);
consoleLoggingComponent.debug("I am debugging Ibukun");
consoleLoggingComponent.info("I am going to be a very good software developer");
consoleLoggingComponent.warn("Warning Ibukun");
consoleLoggingComponent.error("Error Error Error");

//log messages to a file
const fileLoggingComponent = new LoggingComponent(fileStrategy);
fileLoggingComponent.debug("I am debugging Ibukun");
fileLoggingComponent.info("I am going to be a very good software developer");
fileLoggingComponent.warn("Warning Ibukun");
fileLoggingComponent.error("Error Error Error");