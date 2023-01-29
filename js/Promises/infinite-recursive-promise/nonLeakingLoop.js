import { delay } from "../createPromise.js";

function nonLeakingLoop (num) {
    let isErr = num % 2 === 0;
    delay(1000, isErr)
        .then(() => {
            console.log(`Tick ${Date.now()}`);
            nonLeakingLoop(num + 1);
        }).catch((err) => {
            console.log(`Error caugth ${err.message}`);
        });
}

for (let i = 0; i < 1e2; i++) {
    nonLeakingLoop(i);
}