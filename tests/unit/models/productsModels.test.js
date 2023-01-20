const { expect } = require("chai");
const connection = require("../../../src/connection");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const { products, newProduct } = require("./mocks/product.model.mock");

describe("Testando os modelos", function () {
  it('Testando função "listAll" do projectModel', async function () {
    //Arrange
    sinon.stub(connection, "execute").resolves([products]);
    //Act
    const result = await productsModel.listAll();
    //Assert
    expect(result).to.be.deep.equal(products);
  });

  it('Testando função "listById" do projectModel', async function () {
    //Arrange
    sinon.stub(connection, "execute").resolves([[products[0]]]);
    //Act
    const result = await productsModel.listById(1);
    //Assert
    expect(result).to.be.deep.equal(products[0]);
  });

  it("Testando inserção do projectModel", async function () {
    //Arrange
    sinon.stub(connection, "execute").resolves([{ insertId: 4 }]);
    //Act
    const result = await productsModel.insert(newProduct);
    //Assert
    expect(result).to.equal(4);
  });

  afterEach(function () {
    sinon.restore();
  });
});
