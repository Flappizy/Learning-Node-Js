import { EventEmitter } from 'events';

const DivisibleBy5Error = new Error("Timestamp divisible by 5.");

function tick (number, cb) {
    const emitter = new EventEmitter();
    recursiveTimeOut(emitter, number, 0, cb);
    return emitter;   
}

function recursiveTimeOut(emitter, number, countOfTick, cb) {
    if (Date.now() % 5 === 0) {
        process.nextTick(() => emitter.emit('error', DivisibleBy5Error));
        return cb(DivisibleBy5Error, countOfTick);
    }
    
    if (number <= 0) {
        return cb(null, countOfTick);
    }


    process.nextTick(() => emitter.emit('tick'));

    setTimeout(() => {
        emitter.emit("tick");
        return recursiveTimeOut(emitter, number - 50, countOfTick + 1, cb);
    }, 50)
}

tick(1000, (err, ticks) => {
    if (err) {
        console.log(err);
    }
  console.log(`Emitted ${ticks} ${ticks > 1 ? "ticks" : "tick"}.`)
},
).on("tick", () => console.log("Tick"))
.on('error', err => console.log(`${err.message}`));
