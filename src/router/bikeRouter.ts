import express from "express";
import { BikeBusiness } from "../business/BikeBusiness";
import { BikeDatabase } from "../data/BikeDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { BikeController } from "../controller/BikeController";

export const bikeRouter = express.Router();

const bikeBusiness = new BikeBusiness(
    new BikeDatabase(), 
    new IdGenerator()
);

const bikeController = new BikeController(bikeBusiness);

bikeRouter.post("/register", bikeController.registerBike);

bikeRouter.put("/sell/:id", bikeController.sellBike);

bikeRouter.put("/update/:id", bikeController.changePrice);

bikeRouter.get("/", bikeController.getAllBikes);

