import { CustomError } from "../error/CustomError";
import { Bike } from "../model/Bike";
import { BaseDatabase } from "./BaseDatabase";

export class BikeDatabase extends BaseDatabase {
  private static TABLE_NAME = "Bikes";

  insert = async (bike: Bike): Promise<void> => {
    try {
      await BaseDatabase.connection(BikeDatabase.TABLE_NAME).insert({
        id: bike.getId(),
        color: bike.getColor(),
        march: bike.getMarch(),
        mark: bike.getMark(),
        model: bike.getModel(),
        price: bike.getPrice(),
        quantity_stock: bike.getQuantity(),
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  sellBike = async (id: string, quantity: number) => {
    try {
      const stock = await BaseDatabase.connection(BikeDatabase.TABLE_NAME)
        .select("*")
        .where({ id });

      await BaseDatabase.connection(BikeDatabase.TABLE_NAME)
        .where({ id })
        .update({ quantity_stock: stock[0].quantity_stock - quantity });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
  findById = async (id: string): Promise<any> => {
    try {
      const result = await BaseDatabase.connection(BikeDatabase.TABLE_NAME)
        .select("*")
        .where({ id });
      return result[0];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  updatePrice = async (id: string, price: number): Promise<void> => {
    try {
      await BaseDatabase.connection(BikeDatabase.TABLE_NAME)
        .where({ id })
        .update({ price });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getBikes = async (color: string, price: number): Promise<Bike | undefined> => {
    try {
      if (color || price) {
        const result = await BaseDatabase.connection(BikeDatabase.TABLE_NAME)
          .select("*")
          .where("color", "like", `%${color}%`)
          .orWhere("price", "like", `%${price}%`);

        return result[0];
      } else if (!color || !price) {
        const result = await BaseDatabase.connection(BikeDatabase.TABLE_NAME);
        
        return result as any;
      }
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
