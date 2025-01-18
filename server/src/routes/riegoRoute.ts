import { Request, Response, Router } from 'express';
import Riego from '../models/riegoModel';

const router = Router();

//@ts-ignore
router.post('/riego', async (req: Request, res: Response) => {
  try {
    const { fechaInicio, sensorId, usuarioId } = req.body;

    if (!fechaInicio || !sensorId || !usuarioId) {
      return res.status(400).json({ message: 'FechaInicio, sensorId and usuarioId are required.' });
    }

    const newRiego = new Riego({ fechaInicio, sensorId, usuarioId });
    await newRiego.save();

    return res.status(201).json({ message: 'Riego data saved successfully', riego: newRiego });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
});

export default router;
