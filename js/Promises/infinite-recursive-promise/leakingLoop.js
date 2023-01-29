import { delay } from "../createPromise.js";

function leakingLoop (num) {
    let isErr = num % 2 === 0;
    delay(1000, isErr)
        .then(() => {
            console.log(`Tick ${Date.now()}`);
            return leakingLoop(isErr);
        })
}

for (let i = 0; i < 1e2; i++) {
    leakingLoop(i);
}