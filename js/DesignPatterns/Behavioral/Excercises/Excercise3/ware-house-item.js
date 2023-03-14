import { ArrivingState } from "./arriving-state.js";
import { DeliverState } from "./deliver-state.js";
import { StoreState } from "./store-state.js";

export class WarehouseItem {
    constructor({ id, state, name, locationId, address }) {
        this.id = id;
        this.state = state;
        this.locationId = locationId;
        this.deliveryAddress = address;
        this.currentState = null;
        this.name = name;
        this.state = {
            store: new StoreState(this),
            deliver: new DeliverState(this),
            arrive: new ArrivingState(this)
        };
        if (!state) {
            this.currentState = this.state['arrive'];
        } else {
            this.currentState = this.state[state];
        }
    }

    changeState(state) {
        this.currentState = this.state[state];
    }

    store(locationId) {
        this.currentState.store(locationId);
    }

    deliver(address) {
        this.currentState.deliver(address);
    }

    describe() {
        return this.currentState.describe();
    }
}