const { idSchema, addProductSchema } = require("./schemas");

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: "INVALID_VALUE", message: '"id" must be a number' };

  return { type: null, message: "" };
};

const validateProductName = (name) => {
  const { error } = addProductSchema.validate({ name });
  if (error) return { type: "INVALID_NAME", message: error.message };

  return { type: null, message: "" };
};

module.exports = {
  validateId,
  validateProductName,
};
