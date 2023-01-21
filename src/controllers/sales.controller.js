const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();

  if (type) {
    return res.status(500).json(message);
  }

  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);

  if (type) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(message);
};

const registerSale = async (req, res) => {
  const { type, message } = await salesService.registerSale(req.body);

  if (type) {
    res.status(404).json({ message });
  } else {
    res.status(201).json(message);
  }
};

module.exports = {
  registerSale,
  getAllSales,
  getSaleById,
};
