import { Request, Response } from "express";
import { BikeBusiness } from "../business/BikeBusiness";
import { CustomError } from "../error/CustomError";
import { Bike } from "../model/Bike";
import { BikeInputDTO } from "../types/bikeInputDTO";

export class BikeController {
  constructor(private bikeBusiness: BikeBusiness) {}

  registerBike = async (req: Request, res: Response) => {
    try {
      const input: BikeInputDTO = {
        color: req.body.color,
        march: req.body.march,
        mark: req.body.mark,
        model: req.body.model,
        price: req.body.price,
        quantity_stock: req.body.quantity_stock,
      };
      await this.bikeBusiness.registerBike(input);

      res.status(201).send({ message: "Criado com sucesso!" });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message);
      } else if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  };
  sellBike = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const quantity_stock = req.body.quantity_stock;

      await this.bikeBusiness.sellBike(id, quantity_stock);

      res.status(200).send({ message: "Bicicleta(s) vendida com sucesso." });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message);
      } else if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  };
  changePrice = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const price: number = req.body.price;

      await this.bikeBusiness.changePrice(id, price);

      res.status(200).send({ message: "Preço alterado com sucesso!" });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message);
      } else if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  };

  getAllBikes = async (req: Request, res: Response) => {
    try {
      const color = req.query.color as string;
      const price = req.query.price;

      const result = await this.bikeBusiness.getAllBikes(color, Number(price));

      res.status(200).send({ products: result });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message);
      } else if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  };
}
