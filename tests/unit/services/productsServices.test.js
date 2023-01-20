const { expect } = require("chai");
const sinon = require("sinon");
const { productsService } = require("../../../src/services");
const { productsModel } = require("../../../src/models");

const {
  invalidValue,
  validName,
  allProducts,
} = require("./mocks/products.service.mock");

describe("Testando os serviços", function () {
  it('Testando a função "findAll" do productsService', async function () {
    //Arrange
    sinon.stub(productsModel, "listAll").resolves(allProducts);
    //Act
    const result = await productsService.findAll();
    //Assert
    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(allProducts);
  });

  afterEach(function () {
    sinon.restore();
  });
});

describe("Testando busca de produto por ID", function () {
  it("Retorna um erro caso receba um ID inválido", async function () {
    //Arrange
    //Act
    const result = await productsService.findById("a");

    //Assert
    expect(result.type).to.equal("INVALID_VALUE");
    expect(result.message).to.equal('"id" must be a number');
  });

  it("Retorna um erro caso o produto não exista", async function () {
    //Arrange
    sinon.stub(productsModel, "listById").resolves(undefined);

    //Act
    const result = await productsService.findById(1);

    //Assert
    expect(result.type).to.equal("PRODUCT_NOT_FOUND");
    expect(result.message).to.equal("Product not found");
  });

  it("Retorna o producto buscado caso o ID exista", async function () {
    //Arrange
    sinon.stub(productsModel, "listById").resolves(allProducts[0]);

    //Act
    const result = await productsService.findById(1);

    //Assert
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(allProducts[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});

describe("Testando o cadastro de um novo produto", async function () {
  it("Retorna um erro ao passar um nome inválido", async function () {
    //Arrange
    //Act
    const result = await productsService.createProduct(invalidValue);
    //Assert
    expect(result.type).to.equal("INVALID_NAME");
    expect(result.message).to.equal(
      '"name" length must be at least 5 characters long'
    );
  });

  it("Retorna o ID do novo produto cadastrado", async function () {
    //Arrange
    sinon.stub(productsModel, "insert").resolves(4);
    sinon.stub(productsModel, "listById").resolves(allProducts[0]);
    //Act
    const result = await productsService.createProduct(validName);
    //Assert
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(allProducts[0]);
  });
});
