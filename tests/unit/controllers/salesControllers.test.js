const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = require("chai");
const { salesController } = require("../../../src/controllers");
const { salesService } = require("../../../src/services");
chai.use(sinonChai);

const allSalesMock = [
  {
    saleId: 1,
    date: "2023-01-23T12:26:12.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2023-01-23T12:26:12.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2023-01-23T12:26:12.000Z",
    productId: 3,
    quantity: 15,
  },
];

describe("Testes da camada controller dos sales", function () {
  describe("Teste da listagem das vendas", function () {
    it("Retorna todas as vendas e o status 200", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "getAllSales").resolves({
        type: null,
        message: allSalesMock,
      });

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSalesMock);
    });

    it("Retorna uma venda específica com o ID e status 200", async function () {
      const res = {};
      const req = {
        params: 2,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "getSaleById").resolves({
        type: null,
        message: allSalesMock[2],
      });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSalesMock[2]);
    });

    it("Retorna um erro e status 404 se a venda não exister", async function () {
      const res = {};
      const req = {
        params: 500,
      };

      sinon.stub(salesService, "getSaleById").resolves({
        type: "SALE_NOT_FOUND",
        message: "Sale not found",
      });
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    });

    this.afterEach(function () {
      sinon.restore();
    });
  });

  describe("Retorna o registro de uma venda", function () {
    it("Retorna o registro bem sucedido e o status 201", async function () {
      const res = {};
      const req = {
        body: [
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

      sinon.stub(salesService, "registerSale").resolves({
        type: null,
        message: {
          id: 4,
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
        },
      });
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.registerSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 4,
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
      });
    });
  });
});
