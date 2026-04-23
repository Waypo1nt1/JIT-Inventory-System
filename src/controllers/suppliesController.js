const suppliesService = require('../services/suppliesService');

const getAllSupplies = (req, res) => {
    const { title } = req.query;
    const supplies = suppliesService.findAll(title);
    res.json(supplies);
};

const getSupplyById = (req, res) => {
    const id = parseInt(req.params.id);
    const supply = suppliesService.findOne(id);

    if (!supply) {
        return res.status(404).json({ error: 'Поставщик не найден' });
    }
    res.json(supply);
};

const createSupply = (req, res) => {
    const { src, title, text, minBatch, deliveryTerms } = req.body;

    if (!src || !title || !text || !minBatch || !deliveryTerms) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const newSupply = suppliesService.create({ src, title, text, minBatch, deliveryTerms });
    res.status(201).json(newSupply);
};

const updateSupply = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedSupply = suppliesService.update(id, req.body);

    if (!updatedSupply) {
        return res.status(404).json({ error: 'Поставщик не найден' });
    }
    res.json(updatedSupply);
};

const deleteSupply = (req, res) => {
    const id = parseInt(req.params.id);
    const success = suppliesService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Поставщик не найден' });
    }
    res.status(204).send();
};

module.exports = {
    getAllSupplies, getSupplyById, createSupply, updateSupply, deleteSupply
};
