const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (titleQuery) => {
    const supplies = fileService.readData(dataFilePath);

    if (titleQuery) {
        return supplies.filter(w =>
            w.title.toLowerCase().includes(titleQuery.toLowerCase())
        );
    }
    return supplies;
};

const findOne = (id) => {
    const supplies = fileService.readData(dataFilePath);
    return supplies.find(w => w.id === id);
};

const create = (supplyData) => {
    const supplies = fileService.readData(dataFilePath);
    const newId = supplies.length > 0 ? Math.max(...supplies.map(w => w.id)) + 1 : 1;

    const newSupply = { id: newId, ...supplyData };
    supplies.push(newSupply);
    fileService.writeData(dataFilePath, supplies);

    return newSupply;
};

const update = (id, supplyData) => {
    const supplies = fileService.readData(dataFilePath);
    const index = supplies.findIndex(w => w.id === id);

    if (index === -1) return null;

    supplies[index] = { ...supplies[index], ...supplyData };
    fileService.writeData(dataFilePath, supplies);

    return supplies[index];
};

const remove = (id) => {
    const supplies = fileService.readData(dataFilePath);
    const filtered = supplies.filter(w => w.id !== id);

    if (filtered.length === supplies.length) return false;

    fileService.writeData(dataFilePath, filtered);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
