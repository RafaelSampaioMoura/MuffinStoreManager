const { expect } = require("chai");
const connection = require("../../../src/connection");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const {
  products,
  newProduct,
  updateProduct,
} = require("./mocks/product.model.mock");

describe("Testando o productModel", function () {
  it('Testando função "listAll" do projectModel', async function () {
    //Arrange
    sinon.stub(connection, "execute").resolves([products]);
    //Act
    const result = await productsModel.listAll();
    console.log(result);
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

  it("Testando update do projectModel", async function () {
    //Arrange
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
    //Act
    const result = await productsModel.update(1, updateProduct);
    // const updatedProduct = await productsModel.listById(1);
    // console.log(updatedProduct);
    //Assert
    expect(result).to.equal(1);
    // expect(updatedProduct).to.be.deep.equal(updateProduct);
  });

  it("Testando erase do projectModel", async function () {
    //Arrange
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
    //Act
    const result = await productsModel.erase(1);
    //Assert
    expect(result).to.equal(1);
  });

  it("Testando busca por nome", async function () {
    //Arrange
    sinon.stub(connection, "execute").resolves([
      {
        id: 1,
        name: "Martelo de Thor",
      },
    ]);
    //Act
    const result = await productsModel.searchByName("Martelo");
    //Assert
    expect(result).to.be.deep.equal({
      id: 1,
      name: "Martelo de Thor",
    });
  });

  it("Testando busca com query vazio", async function () {
    sinon.stub(connection, "execute").resolves([products]);

    const result = await productsModel.searchByName("");

    expect(result).to.be.deep.equal(products);
  });

  afterEach(function () {
    sinon.restore();
  });
});
