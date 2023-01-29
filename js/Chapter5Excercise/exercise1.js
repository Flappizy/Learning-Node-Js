async function promiseAll (promises) {
    console.log(`Start seconds: ${new Date().getSeconds()}`);

    const outPut = [];

    for (const promise of promises) {
        outPut.push(await promise);
    }

    console.log(outPut);
    console.log(`End seconds: ${new Date().getSeconds()}`);
}

function printAndResolve (seconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(seconds);
            resolve(seconds);
        }, seconds * 1000);
    });
}

promiseAll([printAndResolve(5), printAndResolve(4), printAndResolve(2), printAndResolve(1)]);