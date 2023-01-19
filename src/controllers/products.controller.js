const productsService = require('../services/products.service');

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(500).json(message);

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  // console.log(type);
  // console.log(message);

  if (type) {
    return res.status(404).json({ message: 'Product not found' });
  } 
    res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsService.createProduct(name);

  // console.log(type);

  if (type) return res.status(422).json(message);

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateProduct(id, name);
  console.log(name);

  if (type) {
    return res.status(404).json({ message: 'Product not found' });
  } 
    res.status(200).json(message);
};

const eraseProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.eraseProduct(id);

  if (type) {
    return res.status(404).json({ message: 'Product not found' });
  } 
    res.status(204).json(message);
};

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  eraseProduct,
};
