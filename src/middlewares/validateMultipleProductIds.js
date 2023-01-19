const validateMultipleProductIds = (req, res, next) => {
  const products = req.body;

  products.forEach(({ productId }) => {
    if (!productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  });

  next();
};

module.exports = validateMultipleProductIds;