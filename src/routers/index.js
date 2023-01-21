const express = require('express');
const productsRouter = require('./products.router');
const salesRouter = require('./sales.router');

const router = express.Router();

router.use('/products', productsRouter);

router.use('/sales', salesRouter);

module.exports = router;
