function delayWithError (milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`Error after ${milliseconds}ms`))
        }, milliseconds);
    });
}

async function errorNotCaught () {
    try {
        //return delayWithError(1000); //this will not catch the error locally by the async fuction
        return await delayWithError(1000); //this will catch the error locally by the async function
    } catch (err) {
        console.log(`Error is caught by async function ${err.message}`);
    }
}

errorNotCaught()
    .catch((err) => {
        console.log(`Error caugth by the caller ${err.message}`);
    })