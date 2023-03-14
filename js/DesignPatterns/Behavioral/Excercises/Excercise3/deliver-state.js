export class DeliverState {
    constructor(warehouseItem) {
        this.warehouseItem = warehouseItem;
    }

    store() {
        throw new Error("You can not store a product that has already been delivered");
    }

    deliver(data) {
        throw new Error("Your item has already been delivered");
    }

    describe() {
        return `Item ${this.warehouseItem.id} was delivered to ${this.warehouseItem.name} 
            ${this.warehouseItem.deliveryAddress}`;
    }
}