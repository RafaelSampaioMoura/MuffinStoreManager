const invalId = "hue";

const allSales = [
  {
    saleId: 1,
    date: "2023-01-22T10:48:00.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2023-01-22T10:48:00.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2023-01-22T10:48:00.000Z",
    productId: 3,
    quantity: 15,
  },
];

const newSales = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const invalidProductIds = [
  {
    productId: 999,
    quantity: 1,
  },
];

const successfulSales = {
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

const updateSale = [
  {
    productId: 1,
    quantity: 5,
  },
  {
    productId: 2,
    quantity: 10,
  },
];

const successfulUpdate = {
  id: 3,
  itemsUpdated: [
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

module.exports = {
  allSales,
  invalId,
  invalidProductIds,
  newSales,
  successfulSales,
  updateSale,
  successfulUpdate
};
