const { expect } = require("chai");
const connection = require("../../../src/connection");
const sinon = require("sinon");

const { salesModel } = require("../../../src/models");
const {
  sales,
  newSale,
  salesRegistered,
  salesUpdated,
  updatedSale,
} = require("./mocks/sales.model.mock");

describe("Testando salesModel", function () {
  it("Retorna todas as vendas", async function () {
    sinon.stub(connection, "execute").resolves([sales]);
    // console.log(sales);

    const result = await salesModel.getAllSales();
    // console.log(result);

    expect(result).to.be.deep.equal(sales);
  });

  it("Retorna venda pelo ID", async function () {
    sinon.stub(connection, "execute").resolves([sales[0]]);

    const result = await salesModel.getSaleById(1);

    expect(result).to.be.deep.equal(sales[0]);
  });

  afterEach(function () {
    sinon.restore();
  });

  it("Registra venda corretamente", async function () {
    sinon.stub(connection, "execute").resolves([salesRegistered]);

    const result = await salesModel.registerSale(newSale);
    console.log(result);

    expect(result.itemsSold).to.be.deep.equal(salesRegistered.itemsSold);
  });

  it("Venda é deletada corretament", async function () {
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

    const result = await salesModel.eraseSale(1);

    expect(result).to.equal(1);
  });

  it("Venda é atualizada corretamente", async function () {
    sinon.stub(connection, "execute").resolves(3, salesUpdated);

    const result = await salesModel.updateSale(3, updatedSale);

    expect(result.itemsUpdated).to.be.deep.equal(salesUpdated.itemsSold);
  });
});
