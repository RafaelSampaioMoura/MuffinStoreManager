const camelize = require('camelize');
// const snakeize = require("snakeize");
const connection = require('../connection');

const listAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  // .sort((a, b) => b.id - a.id);

  return camelize(result);
};

const listById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return camelize(result);
};

const insert = async ({ name }) => {
  // console.log(Object.keys(product));
  // const collumns = Object.keys(snakeize(product).join(", "));

  // const placeholders = Object.keys(product)
  //   .map((_key) => "?")
  //   .join(", ");

  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUE(?)',
    [name],
  );

  // console.log(result);

  return result.insertId;
};

const update = async (productId, newProductName) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [newProductName, productId],
  );
  // console.log(result);
  // console.log(affectedRows);

  return affectedRows;
};

const erase = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [productId],
  );

  return affectedRows;
};

const searchByName = async (name) => {
  if (name.length === 0) {
    const [result] = await connection.execute('SELECT * FROM products');

    return result;
  } 
    const [result] = await connection.execute(
      'SELECT * FROM products WHERE name LIKE CONCAT (\'%\', ?, \'%\')',
      [name],
    );

    return result;
};

module.exports = { listAll, listById, insert, update, erase, searchByName };
