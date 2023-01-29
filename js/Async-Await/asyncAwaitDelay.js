import { delay } from '../Promises/createPromise.js';

async function playingWithDelays () {
    console.log('Delaying.....', new Date());

    const dateAfterOneSec = await delay(1000);
    console.log(dateAfterOneSec);

    const dateAfterThreeSec = await delay(3000);
    console.log(dateAfterThreeSec);

    return 'done';
}

playingWithDelays()
    .then((result) => console.log(`After four seconds ${result}`));