const express = require('express');
const validateProductId = require('../middlewares/validateProductId');
const validateQuantity = require('../middlewares/validateQuantity');
const { salesController } = require('../controllers');

const router = express.Router();

router.put(
  '/:id',
  validateProductId,
  validateQuantity,
  salesController.updateSale,
);

router.delete('/:id', salesController.eraseProduct);

router.get('/:id', salesController.getSaleById);

router.get('/', salesController.getAllSales);

router.post(
  '/',
  validateProductId,
  validateQuantity,
  salesController.registerSale,
);

module.exports = router;
