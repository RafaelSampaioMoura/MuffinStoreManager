const produckMock = {
  name: "Jaqueta da Feitiçeira Escarlate",
};

const newProductMock = { id: 1, ...produckMock };

const productListMock = [newProductMock];

module.exports = {
  produckMock,
  newProductMock,
  productListMock,
};
