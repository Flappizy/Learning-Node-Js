export class ArrivingState {
    constructor(warehouseItem) {
        this.warehouseItem = warehouseItem;
    }

    deliver() {
        throw new Error("You can not deliver an item that has not been stored");
    }

    store(data) {
        this.warehouseItem.changeState('store');
        this.warehouseItem.locationId = data //`locationID: ${ Math.floor(Math.random() * 1000) + 1 }`;
    }

    describe(){
        return `Item ${this.warehouseItem.id} is on its way to the warehouse`;
    }
}