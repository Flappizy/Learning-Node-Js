import { WarehouseItem } from "./ware-house-item.js";

const warehouseItem = new WarehouseItem({ id: 620, name: "Ibukun" });
console.log(warehouseItem.describe());
warehouseItem.store(`${ Math.floor(Math.random() * 1000) + 1 }`);
console.log(warehouseItem.describe());
warehouseItem.deliver("Festac");
console.log(warehouseItem.describe());

const warehouseItem2 = new WarehouseItem({
  id: 27,
  state: 'store',
  locationId: `${ Math.floor(Math.random() * 1000) + 1 }`,
  name: "Ibukun"
});
console.log(warehouseItem2.describe());

const warehouseItem3 = new WarehouseItem({
  id: 57,
  state: 'deliver',
  address: "Festac",
  name: "Ibukun"
});
console.log(warehouseItem3.describe());

/* invalid case */
//warehouseItem.deliver("Mr Le Vuong, VN");