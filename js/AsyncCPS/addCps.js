function addAsync(a, b, cb) {
    setTimeout(() => cb(a + b), 100);
}

console.log('before');
addAsync(1, 2, result => console.log(`Result: ${result}`));
console.log('after');