import { colorConsoleCreator } from './factory.js';

const color = process.argv[2];
try {
    const colorClass = colorConsoleCreator(color);   
    colorClass.log();
} catch (error) {
    console.log("Unsupported color type");
}