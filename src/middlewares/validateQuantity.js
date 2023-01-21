const validateQuantity = (req, res, next) => {
  const wrongQuantity = req.body.every(
    (e) => e.quantity < 0 || e.quantity === 0,
  );

  if (wrongQuantity) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  const quantity = req.body.every((e) => e.quantity);

  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

module.exports = validateQuantity;
