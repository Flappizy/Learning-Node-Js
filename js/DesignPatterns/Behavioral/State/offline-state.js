import jsonOverTcp from "json-over-tcp-2";
export class OfflineState {
    constructor(failSafeSocket){
        this.failSafeSocket = failSafeSocket;
    }

    send(data){
        this.failSafeSocket.queue.push(data);
    }

    activate(){
        const retry = () => {
            setTimeout(() => {
                this.activate();
            }, 1000);
        }

        this.failSafeSocket.socket = jsonOverTcp.connect(this.failSafeSocket.options, () => {
            console.log("Connection has been established");
            this.failSafeSocket.socket.removeListener('error', retry);
            this.failSafeSocket.changeState('online');
        })

        this.failSafeSocket.socket.once('error', retry);
    }
}