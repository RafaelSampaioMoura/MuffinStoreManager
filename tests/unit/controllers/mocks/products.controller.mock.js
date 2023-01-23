const validName = "Jaqueta da Feitiçeira Escarlate";
const validId = 4;
const invalidName = "blu";
const invalidId = "hue";

const newProduct = {
  name: validName,
};

const newProductMock = { id: validId, ...newProduct };

const productListMock = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

module.exports = {
  newProduct,
  newProductMock,
  productListMock,
};
