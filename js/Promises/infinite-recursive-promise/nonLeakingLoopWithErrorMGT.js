import { delay } from "../createPromise.js";

function nonLeakingLoopWithErrors () {
    return new Promise((resolve, reject) => {
        (function internalLoop (num) {
            let isErr = num % 2 === 0;
            delay(1, true)
                .then(() => {
                    console.log(`Tick ${Date.now()}`)
                    internalLoop(num + 1);
                })
                .catch(err => {
                    reject(err)
                })
        })()
    })
}

for (let i = 0; i < 1e2; i++) {
    nonLeakingLoopWithErrors();
}