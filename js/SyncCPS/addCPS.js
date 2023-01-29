function addSync(a, b, cb) {
    return cb(a + b);
}

console.log('before')
addSync(1, 2, result => console.log(`Result: ${result}`))
console.log('after')