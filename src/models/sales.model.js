const camelize = require('camelize');
const connection = require('../connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON sp.sale_id = s.id`,
  );

  return camelize(result);
};

const getSaleById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON sp.sale_id = s.id
    WHERE sale_id = ?`,
    [saleId],
  );

  return camelize(result);
};

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

const eraseSale = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [saleId],
  );

  return affectedRows;
};

const updateSale = async (id, salesArr) => {
  const sale = await Promise.all(
    salesArr.map(async ({ productId, quantity }) => {
      await connection.execute(
        'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
        [quantity, id, productId],
      );

      return { productId, quantity };
    }),
  );

  return { saleId: id, itemsUpdated: sale };
};

module.exports = {
  registerSale,
  getAllSales,
  getSaleById,
  eraseSale,
  updateSale,
};
