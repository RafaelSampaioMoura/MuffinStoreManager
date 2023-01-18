const productsService = require("../services/products.service");

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(500).json(message);

  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  console.log(type);
  console.log(message);

  if (type) {
    return res.status(404).json({ message: "Product not found" });
  } else {
    res.status(200).json(message);
  }
};

module.exports = {
  listProducts,
  getProductById,
};
