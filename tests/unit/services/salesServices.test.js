const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");

const {
  allSales,
  invalId,
  newSales,
  invalidProductIds,
  successfulSales,
  updateSale,
  successfulUpdate,
} = require("./mocks/sales.service.mock");

describe("Testando listagem de vendas", function () {
  it("Lista todas as vendas com getAllSales", async function () {
    sinon.stub(salesModel, "getAllSales").resolves(allSales);

    const result = await salesService.getAllSales();

    expect(result.type).to.be.null;
    expect(result.message).to.be.deep.equal(allSales);
  });

  it("Retorna um erro ao enviar um ID inválido", async function () {
    const result = await salesService.getSaleById(invalId);

    expect(result.type).to.be.equal("INVALID_VALUE");
    expect(result.message).to.be.equal('"id" must be a number');
  });

  it("Retorna erro se o ID for inexistente", async function () {
    const result = await salesService.getSaleById(99999);

    expect(result.type).to.be.equal("SALE_NOT_FOUND");
    expect(result.message).to.be.equal("Sale not found");
  });

  it("Lista venda por ID", async function () {
    sinon.stub(salesService, "getSaleById").resolves(allSales[0]);

    const result = await salesService.getSaleById(1);

    expect(result).to.be.deep.equal(allSales[0]);
  });

  this.afterEach(function () {
    sinon.restore();
  });
});

describe("Testes da função auxiliar productExists", function () {
  it("", async function () {
    const resultFalse = await salesService.productExist(9999);
    const resultTrue = await salesService.productExist(1);

    expect(resultFalse).to.be.false;
    expect(resultTrue).to.be.true;
  });

  this.afterEach(function () {
    sinon.restore();
  });
});

describe("Testando cadastro de vendas", function () {
  // it("Retorna erro quando o productId está vazio", async function () {
  //   const result = await salesService.registerSale(invalidProductIds);

  //   expect(result.type).to.be.equal("INVALID_VALUE");
  //   expect(result.message).to.be.equal('"productId" is required');
  // });

  it("Retorna um erro quando é feito o registro de um produto não existente", async function () {
    const result = await salesService.registerSale(invalidProductIds);

    expect(result.type).to.equal("PRODUCT_NOT_FOUND");
    expect(result.message).to.equal("Product not found");
  });

  it("Retorna os produtos listados e o ID da venda", async function () {
    sinon.stub(salesModel, "registerSale").resolves(successfulSales);

    const result = await salesService.registerSale(newSales);

    expect(result.type).to.be.null;
    expect(result.message.id).to.equal(successfulSales.id);
    expect(result.message.itemsSold).to.be.deep.equal(
      successfulSales.itemsSold
    );
  });

  this.afterEach(function () {
    sinon.restore();
  });
});

describe("Testando deleção de vendas", function () {
  it("Retorna um erro quando tenta deletar produto não-existente", async function () {
    const result = await salesService.eraseSale(9999);

    expect(result.type).to.equal("SALE_NOT_FOUND");
    expect(result.message).to.equal("Sale not found");
  });

  it("Deleta uma venda com sucesso", async function () {
    sinon.stub(salesModel, "eraseSale").resolves(1);

    const result = await salesService.eraseSale(1);

    expect(result.type).to.be.null;
    expect(result.message).to.be.empty;
  });

  this.afterEach(function () {
    sinon.restore();
  });
});

describe("Testa a atualização das vendas", function () {
  it("Retorna um erro se o produto não existe", async function () {
    const result = await salesService.updateSale(invalId, invalidProductIds);

    expect(result.type).to.equal("PRODUCT_NOT_FOUND");
    expect(result.message).to.equal("Product not found");
  });

  it("Retorna um erro se a venda não existe", async function () {
    const result = await salesService.updateSale(invalId, updateSale);

    expect(result.type).to.equal("SALE_NOT_FOUND");
    expect(result.message).to.equal("Sale not found");
  });

  it("Retorna as vendas atualizadas", async function () {
    sinon.stub(salesModel, "updateSale").resolves(successfulUpdate);

    const result = await salesService.updateSale(1, updateSale);

    expect(result.type).to.be.null;
    expect(result.message).to.deep.equal(successfulUpdate);
  });

  this.afterEach(function () {
    sinon.restore();
  });
});
