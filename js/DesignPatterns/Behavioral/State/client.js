import { FailSafeSocket } from "./fail-safe-socket.js";

const socket = new FailSafeSocket({ port: 5000 });

setInterval(() => {
    socket.send(process.memoryUsage());
}, 1000);