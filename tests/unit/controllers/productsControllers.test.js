const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = require("chai");
chai.use(sinonChai);

const { productsService } = require("../../../src/services");
const { productsController } = require("../../../src/controllers");
const validateName = require("../../../src/middlewares/validateName");
const {
  newProduct,
  newProductMock,
  productListMock,
} = require("./mocks/products.controller.mock");

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

  describe("Testa a listagem de um produto específico", function () {
    it("Retorna erro e status 404", async function () {
      const res = {};
      const req = {
        params: 999,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, "findById").resolves({
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      });

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });

    it("Retorna produto e status 200", async function () {
      const res = {};
      const req = {
        params: 1,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, "findById").resolves({
        type: null,
        message: productListMock[0],
      });

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productListMock[0]);
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Testa o registro de um novo produto", function () {
    // it("Retorna um erro e status 400 se o nome estive vazio", async function () {
    //   const res = {};
    //   const req = {
    //     body: {},
    //   };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   await productsController.createProduct(req, res);

    //   expect(res.status).to.have.been.calledWith(400);
    //   expect(res.json).to.have.been.calledWith('"name" is required');
    // });

    it("Retorna um erro e status 422 se o nome tiver menos de 5 letras", async function () {
      const res = {};
      const req = {
        body: {
          name: "hue",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub();

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith(
        '"name" length must be at least 5 characters long'
      );
    });

    it("Retorna o novo produto e status 201", async function () {
      const res = {};
      const req = {
        body: {
          name: "Jaqueta da Feitiçeira Escarlate",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "createProduct").resolves({
        type: null,
        message: {
          id: 4,
          name: "Jaqueta da Feitiçeira Escarlate",
        },
      });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 4,
        name: "Jaqueta da Feitiçeira Escarlate",
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Testa a atualização de um produto", function () {
    it("Retorna erro e status 400", async function () {});

    it("Retorna erro e status 404 se o produto não existir", async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: "hue",
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});
