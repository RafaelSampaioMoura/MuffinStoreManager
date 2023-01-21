const validateProductId = (req, res, next) => {
  const productIds = req.body.every((e) => e.productId);

  if (!productIds) return res.status(400).json({ message: '"productId" is required' });

  next();
};

module.exports = validateProductId;
