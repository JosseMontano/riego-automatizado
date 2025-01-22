import express, { Request, Response } from "express";
import ErrorModel from "../models/errorModel";


const router = express.Router();

//@ts-ignore
router.post("/update-error", async (req: Request, res: Response) => {
  try {
    const { sensorTemperatura } = req.body;

    if (!sensorTemperatura) {
      return res.status(400).json({ message: "La temperatura es requerida" });
    }

    const existingError = await ErrorModel.findOne();

    if (existingError) {
      existingError.sensorTemperatura = sensorTemperatura;
      existingError.fecha = new Date().toLocaleTimeString("en-GB", { timeZone: "America/La_Paz" });
      await existingError.save();
      return res.status(200).json({ message: "Registro actualizado", data: existingError });
    } else {
      const newError = new ErrorModel({
        sensorTemperatura,
      });
      await newError.save();
      return res.status(201).json({ message: "Nuevo registro agregado", data: newError });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al procesar la solicitud" });
  }
});

export default router;
