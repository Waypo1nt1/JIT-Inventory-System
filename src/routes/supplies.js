const express = require('express');
const router = express.Router();
const suppliesController = require('../controllers/suppliesController');

router.get('/', suppliesController.getAllSupplies);
router.get('/:id', suppliesController.getSupplyById);
router.post('/', suppliesController.createSupply);
router.patch('/:id', suppliesController.updateSupply);
router.delete('/:id', suppliesController.deleteSupply);

module.exports = router;
