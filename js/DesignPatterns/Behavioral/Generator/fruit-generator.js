function * fruitGenerator() {
    yield 'peach';
    yield 'watermelon';
    return 'summer';
}

for (const fruit of fruitGenerator()) {
    console.log(fruit);
}

const fruitGeneratorObj = fruitGenerator()
console.log(fruitGeneratorObj.next());
console.log(fruitGeneratorObj.next());
console.log(fruitGeneratorObj.next());