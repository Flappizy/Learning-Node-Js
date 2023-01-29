function delayWithError (milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`Error after ${milliseconds}ms`))
        }, milliseconds);
    });
}

async function playingWithError (throwSyncError) {
    try {
        if (throwSyncError) {
            throw new Error('This is a synchronous error');
        }
        await delayWithError(1000);
    } catch (err) {
        console.log(`We have an error: ${err.message}`);
    } finally {
        console.log('Done');
    }
}

playingWithError(true);
console.log(' ');
playingWithError(false);