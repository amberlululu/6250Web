
const uuid = require('uuid').v4;

function makeInventoryList() {
 
  const id1 = uuid();

  const inventoryList = {};
  const inventories = {
    [id1]: {
      id: id1,
      name: 'Apple',
      quantity: 8,
    }
  };

  inventoryList.contains = function contains(id) {
    return !!inventories[id];
  };

  inventoryList.getInventories = function getInventories() {
    return inventories;
  };

  inventoryList.getInventory = function getInventory(id) {
    return inventories[id];
  };

  inventoryList.updateInventory = function updateInventory(id, inventory) {
  
    inventories[id].quantity = inventory.quantity ?? inventories[id].quantity;
   
    inventories[id].name = inventory.name || inventories[id].name;
  };

  return inventoryList;
};

module.exports = {
  makeInventoryList,
};