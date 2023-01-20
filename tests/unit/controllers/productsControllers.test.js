const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = require("chai");
chai.use(sinonChai);

const { productsService } = require("../../../src/services");
const { productsController } = require("../../../src/controllers");
const { produckMock, newProductMock, productListMock } = require("./mocks/products.controller.mock");

describe("Testes da camada controller dos products", function () {
  describe("Testando a listagem de todos os produtos", function () {
    it("Retorna a lista e o status 200", async function () {
      //Arrange
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "findAll")
        .resolves({ type: null, message: productListMock });
      //Act
      await productsController.listProducts(req, res);

      //Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productListMock);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
