const invalidValue = "hue";
const invalidName = "c*";
const validName = "Jaqueta da Feitiçeira Escarlate";
const invalId = "hau-hau";
const nonExistentId = 999999;
const valId = 1;

const allProducts = [
  {
    id: 4,
    name: validName,
  },
];

const updatedProduct = {
  id: 1,
  name: validName,
}

module.exports = {
  invalidValue,
  validName,
  allProducts,
  invalId,
  nonExistentId,
  invalidName,
  valId,
  updatedProduct
};
