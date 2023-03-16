import { consoleMiddleware } from "./console-middleware.js";
import { fileMiddleware } from "./file-middleware.js";
import { LogManager } from "./log-manager.js";
import { timeStampedMiddleware } from "./time-stamped-middleware.js";


const logger = new LogManager();
logger
  .use(timeStampedMiddleware)
  .use(consoleMiddleware("log"))
  .use(fileMiddleware("test.txt"));

logger.log("Testing!! Testing!!");