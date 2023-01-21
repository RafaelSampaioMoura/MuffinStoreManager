const { salesModel, productsModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const productExist = async (productId) => {
  const checkProduct = await productsModel.listById(productId);
  if (!checkProduct) {
    return false;
  }
  return true;
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
};
