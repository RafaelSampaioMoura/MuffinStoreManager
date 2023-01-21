const connection = require('../connection');

const registerSale = async (salesArr) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (NOW())',
  );

  const sale = await Promise.all(
    salesArr.map(async ({ productId, quantity }) => {
      await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
        [insertId, productId, quantity],
      );

      return { productId, quantity };
    }),
  );

  return { id: insertId, itemsSold: sale };
};

module.exports = {
  registerSale,
};
