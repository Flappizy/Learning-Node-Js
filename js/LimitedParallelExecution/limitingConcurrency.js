function  makeSampleTask (name) {
    return (cb) => {
        console.log(`${name} started`)
        setTimeout(() => {
          console.log(`${name} completed`)
          cb()
        }, Math.random() * 2000)
    }
}

const tasks = [
    makeSampleTask('Task 1'),
    makeSampleTask('Task 2'),
    makeSampleTask('Task 3'),
    makeSampleTask('Task 4'),
    makeSampleTask('Task 5')
];

let completed = 0;
const concurrency = 2;
let index = 0;
let running = 0;

function limitConcurrency () {
    while (running < concurrency && index < tasks.length) {
        const task = tasks[index++];
        task(() => {
            if (completed++ === tasks.length) {
                return finish();
            }
            running--;
            limitConcurrency();
        });
        running ++;
    }
}

function finish () {
    console.group(`All tasks have been completed`);
}

limitConcurrency();