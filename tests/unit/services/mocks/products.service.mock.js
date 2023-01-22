const invalidValue = "hue";
const invalidName = "c*";
const validName = "Jaqueta da Feitiçeira Escarlate";
const invalId = "hau-hau";
const nonExistentId = 999999;
const valId = 1;

const allProducts = [
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

const updatedProduct = {
  id: 1,
  name: validName,
};

module.exports = {
  invalidValue,
  validName,
  allProducts,
  invalId,
  nonExistentId,
  invalidName,
  valId,
  updatedProduct,
};
