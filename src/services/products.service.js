const { productsModel } = require("../models");
const schema = require("./validations/validationsInputValues");

const findAll = async () => {
  const products = await productsModel.listAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const product = await productsModel.findById(productId);
  if (!product)
    return { type: "PRODUCT_NOT_FOUND", message: "Product not found" };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const error = schema.validateNewPassenger(name);
  if (error.type) return error;

  const newPassengerId = await passengerModel.insert({ name });
  const newPassenger = await passengerModel.findById(newPassengerId);

  return { type: null, message: newPassenger };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};
