import { OfflineState } from "./offline-state.js";
import { OnlineState } from "./online-state.js";

export class FailSafeSocket {
    constructor(options) {
        this.options = options;
        this.queue = [];
        this.state = {
            offline: new OfflineState(this),
            online: new OnlineState(this)
        };
        this.currentState = null;
        this.socket = null;
        this.changeState('offline');
    }

    changeState(state) {
        console.log(`Activating state: ${state}`);
        this.currentState = this.state[state];
        this.currentState.activate();
    }

    send(data) {
        this.currentState.send(data);
    }
}