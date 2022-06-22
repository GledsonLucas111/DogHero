import { Bike } from "../../src/model/Bike";

export class BikeDatabaseMock {
  insert = async (bike: Bike): Promise<void> => {};

  sellBike = async (id: string, quantity: number) => {};

  findById = async (id: string): Promise<any> => {};

  updatePrice = async (id: string, price: number): Promise<void> => {};

  getBikes = async (color: string, price: number): Promise<any> => {};
}
