import { ImmutableBuffer } from "./immutableBuffer.js";

const message = 'Hello';
const immutableBuffer = new ImmutableBuffer(message.length, ({ write }) => {
    write(message);
});