const express = require('express');
const validateName = require('../middlewares/validateName');
const { productsController } = require('../controllers');

const router = express.Router();

router.delete('/:id', productsController.eraseProduct);

router.put('/:id', validateName, productsController.updateProduct);

router.get('/search', productsController.searchByName);

router.get('/:id', productsController.getProductById);

router.post('/', validateName, productsController.createProduct);

router.get('/', productsController.listProducts);

module.exports = router;
