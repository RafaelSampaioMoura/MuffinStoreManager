const camelize = require("camelize");
const snakeize = require("snakeize");
const connection = require("../connection");

const listAll = async () => {
  const [result] = await connection
    .execute(`SELECT * FROM products`)
    // .sort((a, b) => b.id - a.id);

  return camelize(result);
  // console.log("Aqui");
};

const listById = async (productId) => {
  const [[result]] = await connection.execute(
    `SELECT * FROM products WHERE id = ?`,
    [productId]
  );
  console.log(result);
  return camelize(result);
};

const insert = async (product) => {
  const collumns = Object.keys(snakeize(product).join(", "));

  const placeholders = Object.keys(product)
    .map((_key) => "?")
    .join(", ");

  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${collumns}) VALUE(${placeholders})`,
    [...Object.values(product)]
  );

  return insertId;
};

module.exports = { listAll, listById, insert };
