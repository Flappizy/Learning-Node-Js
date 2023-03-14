export class StoreState {
    constructor(warehouseItem) {
        this.warehouseItem = warehouseItem
    }

    deliver(data) {
        this.warehouseItem.deliveryAddress = data;
        this.warehouseItem.locationId = null;
        this.warehouseItem.changeState('deliver');
    }


    store() {
        throw new Error("Your item has already been stored");
    }

    describe() {
        return `Item ${this.warehouseItem.id} is stored in location ${this.warehouseItem.locationId}`;
    }
}