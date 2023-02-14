import { BlueConsole } from "./blueConsole.js";
import { GreenConsole } from "./greenConsole.js";
import { RedConsole } from "./redConsole.js";

export function colorConsoleCreator(color) {
    if (color.toLowerCase() === "red") {
        return new RedConsole();
    } else if (color.toLowerCase() === "green") {
        return new GreenConsole();
    } else if (color.toLowerCase() === "blue") {
        return new BlueConsole();
    }
    else {
        throw new Error('Color requested is unsupported');
    }
}