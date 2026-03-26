const warehousesService = require('../services/warehousesService');

const getAllWarehouses = (req, res) => {
    const { title } = req.query;
    const warehouses = warehousesService.findAll(title);
    res.json(warehouses);
};

const getWarehouseById = (req, res) => {
    const id = parseInt(req.params.id);
    const warehouse = warehousesService.findOne(id);
    
    if (!warehouse) {
        return res.status(404).json({ error: 'Склад не найден' });
    }
    res.json(warehouse);
};

const createWarehouse = (req, res) => {
    const { src, title, text, capacity } = req.body;
    
    if (!src || !title || !text || !capacity) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }
    
    const newWarehouse = warehousesService.create({ src, title, text, capacity });
    res.status(201).json(newWarehouse);
};

const updateWarehouse = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedWarehouse = warehousesService.update(id, req.body);
    
    if (!updatedWarehouse) {
        return res.status(404).json({ error: 'Склад не найден' });
    }
    res.json(updatedWarehouse);
};

const deleteWarehouse = (req, res) => {
    const id = parseInt(req.params.id);
    const success = warehousesService.remove(id);
    
    if (!success) {
        return res.status(404).json({ error: 'Склад не найден' });
    }
    res.status(204).send();
};

module.exports = {
    getAllWarehouses, getWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse
};