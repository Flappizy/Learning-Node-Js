
export class OnlineState {
    constructor(failSafeSocket) {
        this.failSafeSocket = failSafeSocket;
        this.hasDisconnected = false;
    }    

    send(data) {
        this.failSafeSocket.queue.push(data);
        this._safeWrite(data);
    }

    _safeWrite(data) {
        this.failSafeSocket.socket.write(data, (err) => {
            if (!this.hasDisconnected && !err) {
                this.failSafeSocket.queue.shift();
            }
        });
    }

    activate() {
        this.hasDisconnected = false;
        for (const data of this.failSafeSocket.queue) {
            this._safeWrite(data);
        }

        this.failSafeSocket.socket.once('error', () => {
            this.hasDisconnected = true;
            this.failSafeSocket.changeState('offline');
        })
    }
}