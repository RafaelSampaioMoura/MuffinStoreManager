const { idSchema, addProductSchema, addSaleProduct } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateProductName = (name) => {
  const { error } = addProductSchema.validate({ name });
  if (error) {
    return {
      type: 'INVALID_NAME',
      message: '"name" length must be at least 5 characters long',
    };
  }

  return { type: null, message: '' };
};
const validateSaleObject = (sale) => {
  const error = addSaleProduct.validate(sale);
  if (error) {
    console.log(error);
    return { type: 'INVALID_VALUE', message: error.error };
  }

  return { type: null, message: '' };
};

const validateSalesArray = (salesArr) => {
  const newSalesArr = salesArr.map((sale) => {
    const error = validateSaleObject(sale);
    if (error.type) return error;

    return sale;
  });

  return newSalesArr;
};

module.exports = {
  validateId,
  validateProductName,
  validateSalesArray,
};
