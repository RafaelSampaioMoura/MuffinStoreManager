const { salesService } = require('../services');

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
};
