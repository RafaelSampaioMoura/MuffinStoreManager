// const connection = require('../connection');

// const registerSale = async (salesArr) => {
//   const [{ insertid }] = connection.execute(
//     'INSERT INTO sales (date) VALUE (NOW())',
//   );

//   salesArr.forEach(async (sale) => {
//     console.log(Object.keys(sale));
//     const collumns = Object.keys(snakeize(sale).join(', '));

//     const placeholders = Object.keys(sale)
//       .map((_key) => '?')
//       .join(', ');

//     const [result] = await connection.execute(
//       `INSERT INTO sales_product (${collumns}) VALUES (?, ?, ?)`,
//       [],
//     );
//   });
// };

// module.exports = {
//   registerSale,
// };
