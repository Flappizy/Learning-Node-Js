import { createPostStatusCmd } from "./createPostStatusCmd.js";
import { Invoker } from "./invoker.js";
import { statusUpdateService } from "./statusUpdateService.js";

const invoker = new Invoker();
const command = createPostStatusCmd(statusUpdateService, "Hello Ibukun");
invoker.run(command);
invoker.runRemotely(command);
invoker.delay(command, 1000 * 3);
invoker.undo();
