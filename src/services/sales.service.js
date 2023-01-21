const { salesModel, productsModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const SALE_NOT_FOUND = 'Sale not found';

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return { type: null, message: allSales };
};

const productExist = async (productId) => {
  const checkProduct = await productsModel.listById(productId);
  if (!checkProduct) {
    return false;
  }
  return true;
};

const getSaleById = async (saleId) => {
  const error = schema.validateId(saleId);
  if (error.type) {
    return error;
  }

  const sale = await salesModel.getSaleById(saleId);

  if (sale.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: SALE_NOT_FOUND };
  }

  return { type: null, message: sale };
};

const registerSale = async (salesArr) => {
  salesArr.map((sale) => {
    const error = schema.validateSaleObject(sale);
    if (error.type) return error;

    return sale;
  });

  const allProductsExist = await Promise.all(
    salesArr.map(async ({ productId }) => productExist(productId)),
  );

  if (!allProductsExist.every((e) => e === true)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const addedSale = await salesModel.registerSale(salesArr);
  return { type: null, message: addedSale };
};

module.exports = {
  registerSale,
  getAllSales,
  getSaleById,
};
