import { Request, Response, Router } from 'express';
import Sensor from '../models/sensorModel';

const router = Router();

//@ts-ignore
router.post('/sensor', async (req: Request, res: Response) => {
  try {
    const { temperature, humidity } = req.body;

    if (temperature === undefined || humidity === undefined) {
      return res.status(400).json({ message: 'Temperature and humidity are required.' });
    }

    const newSensor = new Sensor({ temperature, humidity });
    await newSensor.save();

    return res.status(201).json({ message: 'Sensor data saved successfully', sensor: newSensor });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
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
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
});

export default router;
