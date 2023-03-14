import { ConsoleLogger } from "./console-logger.js";
import { FileLogger } from "./file-logger.js";

//Logs to the console
const consoleLogger = new ConsoleLogger();
consoleLogger.info([1, 2, 3]);
consoleLogger.debug("Hello to debugging ", "Debugging Ibukun");
consoleLogger.warn("Hello to warning ", "Warning Ibukun");
consoleLogger.error("Hello to error ", "ERROR ERROR ERROR");

//Logs to file
const fileLogger = new FileLogger();
fileLogger.info([1, 2, 3]);
fileLogger.debug("Hello to debugging ", "Debugging Ibukun");
fileLogger.warn("Hello to warning ", "Warning Ibukun");
fileLogger.error("Hello to error ", "ERROR ERROR ERROR");