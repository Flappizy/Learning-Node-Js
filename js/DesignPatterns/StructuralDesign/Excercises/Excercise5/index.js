import { createLazyBuffer } from "./lazy-buffer.js";

// TESTING
const buffer = createLazyBuffer(20);


try {
  console.log('Log buffer:', buffer.toString()); // throws an error
} catch(e) {
  console.error('Error', e);
}

buffer.write('Hello to buffer');
buffer.write('New message');
console.log('Log buffer:', buffer.toString()); // success