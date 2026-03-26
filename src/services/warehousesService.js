const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (titleQuery) => {
    const warehouses = fileService.readData(dataFilePath);

    if (titleQuery) {
        return warehouses.filter(w => 
            w.title.toLowerCase().includes(titleQuery.toLowerCase())
        );
    }
    return warehouses;
};

const findOne = (id) => {
    const warehouses = fileService.readData(dataFilePath);
    return warehouses.find(w => w.id === id);
};

const create = (warehouseData) => {
    const warehouses = fileService.readData(dataFilePath);
    const newId = warehouses.length > 0 ? Math.max(...warehouses.map(w => w.id)) + 1 : 1;
        
    const newWarehouse = { id: newId, ...warehouseData };
    warehouses.push(newWarehouse);
    fileService.writeData(dataFilePath, warehouses);
    
    return newWarehouse;
};

const update = (id, warehouseData) => {
    const warehouses = fileService.readData(dataFilePath);
    const index = warehouses.findIndex(w => w.id === id);
    
    if (index === -1) return null;
    
    warehouses[index] = { ...warehouses[index], ...warehouseData };
    fileService.writeData(dataFilePath, warehouses);
    
    return warehouses[index];
};

const remove = (id) => {
    const warehouses = fileService.readData(dataFilePath);
    const filtered = warehouses.filter(w => w.id !== id);
    
    if (filtered.length === warehouses.length) return false; 
    
    fileService.writeData(dataFilePath, filtered);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };