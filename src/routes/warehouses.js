const express = require('express');
const router = express.Router();
const warehousesController = require('../controllers/warehousesController');

router.get('/', warehousesController.getAllWarehouses);
router.get('/:id', warehousesController.getWarehouseById);
router.post('/', warehousesController.createWarehouse);
router.patch('/:id', warehousesController.updateWarehouse);
router.delete('/:id', warehousesController.deleteWarehouse);

module.exports = router;