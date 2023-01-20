const { expect } = require("chai");
const sinon = require("sinon");
const { productsService } = require("../../../src/services");
const { productsModel } = require("../../../src/models");

const {
  invalidValue,
  validName,
  allProducts,
  invalId,
  nonExistentId,
  invalidName,
  valId,
  updatedProduct,
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

  afterEach(function () {
    sinon.restore();
  });
});

describe("Testando atualização de um produto", function () {
  it("Retorna um erro ao passar um ID inválido", async function () {
    //Arrange
    //Act
    const result = await productsService.updateProduct(invalId);
    //Assert
    expect(result.type).to.equal("INVALID_VALUE");
    expect(result.message).to.equal('"id" must be a number');
  });

  it("Retorna um erro ao passar um ID de um produto não-existente", async function () {
    //Arrange
    //Act
    const result = await productsService.updateProduct(nonExistentId);
    //Assert
    expect(result.type).to.equal("PRODUCT_NOT_FOUND");
    expect(result.message).to.equal("Product not found");
  });

  it("Retorna um erro ao tentar atualiza um produto com nome inválido", async function () {
    //Arrange
    //Act
    const result = await productsService.updateProduct(valId, invalidName);
    //Assert
    expect(result.type).to.equal("INVALID_NAME");
    expect(result.message).to.equal(
      '"name" length must be at least 5 characters long'
    );
  });

  it("Retorna o produto atualizado", async function () {
    //Arrange
    sinon.stub(productsModel, "update").resolves(1);
    //Act
    const result = await productsService.updateProduct(valId, validName);
    //Assert
    expect(result.type).to.be.null;
    expect(result.message).to.be.deep.equal({
      id: valId,
      name: validName,
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

describe("Testando a deleção de um produto", function () {
  it("Retorna um erro ao passar um ID inválido", async function () {
    //Arrange
    //Act
    const result = await productsService.eraseProduct(invalId);
    //Assert
    expect(result.type).to.equal("INVALID_VALUE");
    expect(result.message).to.equal('"id" must be a number');
  });

  it("Retorna um erro ao passar um ID de um produto não-existente", async function () {
    //Arrange
    //Act
    const result = await productsService.eraseProduct(nonExistentId);
    //Assert
    expect(result.type).to.equal("PRODUCT_NOT_FOUND");
    expect(result.message).to.equal("Product not found");
  });

  it("Deleta um produto com sucesso", async function () {
    //Arrange
    sinon.stub(productsModel, "erase").resolves(1);
    //Act
    const result = await productsService.eraseProduct(valId);
    //Assert
    expect(result.type).to.be.null;
    expect(result.message).to.equal("");

    sinon.stub(productsModel, "listById").resolves(undefined);

    const productNotFound = await productsService.findById(valId);

    expect(productNotFound.type).to.equal("PRODUCT_NOT_FOUND");
    expect(productNotFound.message).to.equal("Product not found");
  });

  it("Retorna um erro ao tentar deletar um produto já deletado", async function () {
    //Arrange
    sinon.stub(productsModel, "erase").resolves(0);
    //Act
    await productsService.eraseProduct(valId);
    const newResult = await productsService.eraseProduct(valId);
    //Assert
    expect(newResult.type).to.equal("PRODUCT_NOT_FOUND");
    expect(newResult.message).to.equal("Product not found");
  });

  afterEach(function () {
    sinon.restore();
  });
});
