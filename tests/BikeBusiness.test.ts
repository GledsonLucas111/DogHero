import { BikeBusiness } from "../src/business/BikeBusiness";
import { BikeInputDTO } from "../src/types/bikeInputDTO";
import { BikeDatabaseMock } from "./mocks/BikeDatabaseMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";

const bikeBusinessMock = new BikeBusiness(
  new BikeDatabaseMock(),
  new IdGeneratorMock()
);

const resisterTest1: BikeInputDTO = {
  color: "Ciano",
  march: "18 Marchas",
  mark: "",
  model: "Aro 22",
  price: 1200,
  quantity_stock: 11,
};

const resisterTest2: any = {
  color: "Ciano",
  march: "18 Marchas",
  mark: "Houston",
  model: "Aro 22",
  price: "200",
  quantity_stock: 15,
};

const resisterTest3: BikeInputDTO = {
  color: "Ciano",
  march: "18 Marchas",
  mark: "Houston",
  model: "Aro 22",
  price: 200,
  quantity_stock: 15,
};

describe("Teste de cadastro de bicicleta", () => {
  test("Erro se algum campo no body da requisição estiver vazio", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.registerBike(resisterTest1);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Preencha os campos: 'color', 'march', 'mark', 'model', 'price' e 'quantity_stock'."
      );
      expect(error.statusCode).toEqual(422);
    }
  });

  test("Erro caso o price ou quantity_stock forem diferente de number", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.registerBike(resisterTest2);
    } catch (error: any) {
      expect(error.message).toEqual(
        "'price' ou 'quantity_stock' precisa ser um numero."
      );
      expect(error.statusCode).toEqual(409);
    }
  });

  test("Sucesso no cadastro", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.registerBike(resisterTest3);
    } catch (error) {
      console.log(error);
    }
  });
});

describe("Teste de venda de bicicleta(s)", () => {
  test("Erro caso o id não for passado no path params", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.sellBike("", 5);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Necessita de um 'id' no Path params."
      );
      expect(error.statusCode).toEqual(422);
    }
  });

  test("Error caso o for não for passado nada no body", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.sellBike("id_mockado", "" as any);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Preencha o campo 'quantidade' no body."
      );
      expect(error.statusCode).toEqual(422);
    }
  });

  test("Error caso o for passado string na body", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.sellBike("id_mockado", "as" as any);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Quantity_stock precisa ser um numero."
      );
      expect(error.statusCode).toEqual(409);
    }
  });

  test("Erro caso a bicicleta não for encontrada", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.sellBike("123", 1);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Bicicleta não encontrada."
      );
      expect(error.statusCode).toEqual(404);
    }
  });

  test("Sucesso na venda de uma bicicleta", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.sellBike("id_mockado", 1);
    } catch (error) {
      console.log(error)
    }
  });
});

describe("Teste de mudar o preço de uma bicicleta", () => {
  test("Erro caso o id não for passado no path params", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.sellBike("", 200);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Necessita de um 'id' no Path params."
      );
      expect(error.statusCode).toEqual(422);
    }
  });

  test("Error caso o for não for passado nada no body", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.sellBike("id_mockado", "" as any);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Preencha o campo 'quantidade' no body."
      );
      expect(error.statusCode).toEqual(422);
    }
  });

  test("Error caso o for passado string na body", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.sellBike("id_mockado", "as" as any);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Quantity_stock precisa ser um numero."
      );
      expect(error.statusCode).toEqual(409);
    }
  });

  test("Erro caso a bicicleta não for encontrada", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.sellBike("123", 800);
    } catch (error: any) {
      expect(error.message).toEqual(
        "Bicicleta não encontrada."
      );
      expect(error.statusCode).toEqual(404);
    }
  });

  test("Sucesso ao preço de uma bicicleta", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.sellBike("id_mockado", 800);
    } catch (error) {
      console.log(error)
    }
  });

});

describe("Teste de pegar e filtrar bicicleta(s)", () => {
  test("Erro caso a(s) bicicleta(s) não for encontrada", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.getAllBikes("azul", undefined as any)
    } catch (error: any) {
      expect(error.message).toEqual(
        "Nenhuma bicicleta encontrada."
      );
      expect(error.statusCode).toEqual(404);
    }
  });
  test("Sucesso na busca de todas as bicicletas", async () => {
    expect.assertions;
    try {
      await bikeBusinessMock.getAllBikes("", "" as any)
    } catch (error) {
      console.log(error)
    }
  });
});
