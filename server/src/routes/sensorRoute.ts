import { Request, Response, Router } from 'express';
import Sensor from '../models/sensorModel';

const router = Router();

//@ts-ignore
router.post('/sensor', async (req: Request, res: Response) => {
  try {
    const { temperature, humidity } = req.body;  
    console.log(temperature, humidity);
    if (temperature === undefined || humidity === undefined) {
      return res.status(400).json({ message: 'Temperatura, humedad y estado son requeridos.' });
    }

    const newSensor = new Sensor({ temperature, humidity, estado:true });
    await newSensor.save();

    return res.status(201).json({ message: 'Datos guardados', sensor: newSensor });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  }
});

//@ts-ignore
router.get('/sensor', async (req: Request, res: Response) => {
  try {
    const sensors = await Sensor.find();  
    return res.status(200).json(sensors);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  }
});

export default router;
