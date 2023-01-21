const { productsModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const PRODUCT_NOT_FOUND = 'Product not found';

const findAll = async () => {
  const products = await productsModel.listAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.listById(productId);
  if (!product) {
    // console.log("aqui!");
    return { type: 'PRODUCT_NOT_FOUND', message: PRODUCT_NOT_FOUND };
  }
  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateProductName(name);
  if (error.type) return error;

  const newProductId = await productsModel.insert({ name });
  const newProduct = await productsModel.listById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  const invalidId = schema.validateId(id);
  // console.log(invalidId);
  if (invalidId.type) return invalidId;

  const productExists = await productsModel.listById(id);
  // console.log(productExists);
  if (!productExists) {
    return { type: 'PRODUCT_NOT_FOUND', message: PRODUCT_NOT_FOUND };
  }

  const invalidName = await schema.validateProductName(name);
  // console.log(invalidName);
  if (invalidName.type) return invalidName;

  const affectedRows = await productsModel.update(id, name);
  // console.log(updatedProduct);
  if (affectedRows !== 1) {
    return { type: 'PRODUCT_NOT_FOUND', message: PRODUCT_NOT_FOUND };
  }

  return { type: null, message: { id, name } };
};

const eraseProduct = async (id) => {
  const invalidId = schema.validateId(id);
  // console.log(invalidId);
  if (invalidId.type) return invalidId;

  const productExists = await productsModel.listById(id);
  // console.log(productExists);
  if (!productExists) {
    return { type: 'PRODUCT_NOT_FOUND', message: PRODUCT_NOT_FOUND };
  }

  const affectedRows = await productsModel.erase(id);
  if (affectedRows !== 1) {
    return { type: 'PRODUCT_NOT_FOUND', message: PRODUCT_NOT_FOUND };
  }

  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  eraseProduct,
};
