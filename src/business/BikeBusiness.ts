import { BikeDatabase } from "../data/BikeDatabase";
import { CustomError } from "../error/CustomError";
import { Bike } from "../model/Bike";
import { IdGenerator } from "../services/IdGenerator";
import { BikeInputDTO } from "../types/bikeInputDTO";

export class BikeBusiness {
  constructor(
    private bikeDatabase: BikeDatabase,
    private idGenerator: IdGenerator
  ) {}
  
  registerBike = async (input: BikeInputDTO): Promise<void> => {
    const { color, march, mark, model, price, quantity_stock } = input;

    if (!color || !march || !mark || !model || !price || !quantity_stock) {
      throw new CustomError(
        422,
        "Preencha os campos: 'color', 'march', 'mark', 'model', 'price' e 'quantity_stock'."
      );
    }
    if (typeof price !== "number" || typeof quantity_stock !== "number") {
      throw new CustomError(409, "'price' ou 'quantity_stock' precisa ser um numero.");
    }
    

    const id = this.idGenerator.generateId();

    const bike: Bike = new Bike(
      id,
      color,
      march,
      mark,
      model,
      price,
      quantity_stock
    );

    await this.bikeDatabase.insert(bike);
  };

  sellBike = async (id: string, quantity: number) => {
    if (!id) {
      throw new CustomError(422, "Necessita de um 'id' no Path params.");
    }
    if (!quantity) {
      throw new CustomError(422, "Preencha o campo 'quantidade' no body.");
    }
    if (typeof quantity !== "number") {
      throw new CustomError(409, "Quantity_stock precisa ser um numero.");
    }
    const findId = await this.bikeDatabase.findById(id);
    if(!findId) {
      throw new CustomError(404, "Bicicleta não encontrada.");
    }

    await this.bikeDatabase.sellBike(id, quantity);
  };

  changePrice = async (id: string, price: number): Promise<void> => {
    if (!id) {
      throw new CustomError(422, "Necessita de um 'id' no Path params.");
    }
    if (!price) {
      throw new CustomError(422, "Preencha o campo 'price' no body.");
    }
    if (typeof price !== "number") {
      throw new CustomError(409, "Preço precisa ser um numero.");
    }
    const findId = await this.bikeDatabase.findById(id);
    if(!findId) {
      throw new Error("Bicicleta não encontrada.");
    }

    await this.bikeDatabase.updatePrice(id, price);
  };

  getAllBikes = async (color: string, price: number): Promise<Bike> => {
    
    const result = await this.bikeDatabase.getBikes(color, price);
    console.log(result);

    if (!result) {
      throw new CustomError(404, "Nenhuma bicicleta encontrada.");
    }
    return result;
  };
}
