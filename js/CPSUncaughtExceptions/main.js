import { readJsonThrows } from "./jsonReaderThrows.js";

readJsonThrows('JobAppTrack.txt', (err) => {
    console.log(err);
});

//This allows you catch an uncaught exception from a CPS callback function
process.on('uncaughtException', (err) => {
    console.error(`This will catch at last the JSON parsing exception: ${err.message}`);
    // Terminates the application with 1 (error) as exit code.
    // Without the following line, the application would continue
    process.exit(1);
});