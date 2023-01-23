const validateName = (req, res, next) => {
  const { name } = req.body;
  console.log(name);

  if (!name) {
    res.status(400).send({
      message: '"name" is required',
    });
  } else if (name.length < 5) {
    res.status(422).send({
      message: '"name" length must be at least 5 characters long',
    });
  } else {
    next();
  }
};

module.exports = validateName;
