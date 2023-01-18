const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/:id', productsController.getProductById);

router.get('/', productsController.listProducts);

module.exports = router;