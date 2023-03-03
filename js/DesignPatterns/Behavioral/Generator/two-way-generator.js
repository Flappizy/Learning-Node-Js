function * twoWayGenerator() {
    const message = yield null;
    yield `Hello ${message}`;
    const name = yield null;
    yield `Your name is ${name}`;
}

function * twoWayGeneratorException() {
    try {
        const message = yield null;
        yield `Hello ${message}`;
        const name = yield null;
        yield `Your name is ${name}`;   
    } catch (error) {
        yield 'Hello error: ' + error.message
    }
}

const twoWayObject = twoWayGenerator();
twoWayObject.next();
console.log(twoWayObject.next("you absolute beautiful human"));
twoWayObject.next();
console.log(twoWayObject.next("Ibukun the greatest"));

//Using throw():
const twoWayException = twoWayGeneratorException();
twoWayException.next();
console.log(twoWayException.throw(new Error('You have ecountered an error')));

//Using return():
const twoWayReturn = twoWayGenerator()
console.log(twoWayReturn.return('myReturnValue'))