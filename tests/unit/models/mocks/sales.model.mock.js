const sales = [
  {
    saleId: 1,
    date: "2023-01-21T21:44:12.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2023-01-21T21:44:12.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2023-01-21T21:44:12.000Z",
    productId: 3,
    quantity: 15,
  },
];

const newSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const salesRegistered = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const salesUpdated = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 5,
    },
    {
      productId: 2,
      quantity: 10,
    },
  ],
};

const updatedSale = [
  {
    productId: 1,
    quantity: 5,
  },
  {
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  sales,
  newSale,
  salesRegistered,
  salesUpdated,
  updatedSale,
};
