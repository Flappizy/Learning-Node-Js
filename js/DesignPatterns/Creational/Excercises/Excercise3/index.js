import { Queue } from "./queue.js";

const queue = new Queue((enqueue) => {
    //enqueue(1);
    //enqueue(3);
  
    setTimeout(() => enqueue(9), 500);
    setTimeout(() => enqueue(2), 1000);
    setTimeout(() => enqueue(6), 2000);
    setTimeout(() => enqueue(3), 0);
  });
  
  console.log(await queue.dequeue());
  console.log(await queue.dequeue());
  console.log(await queue.dequeue());
  console.log(await queue.dequeue());