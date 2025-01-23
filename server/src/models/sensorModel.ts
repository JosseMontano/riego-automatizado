import { Schema, model } from 'mongoose';

const sensorSchema = new Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  estado: { type: Boolean, required: true },
  timestamp: {
    type: String,
    default: () => {
      const now = new Date();
      const boliviaTime = new Date(now.getTime() - 4 * 3600000); // Ajuste para la zona horaria de Bolivia (-4 horas)

      // Formatear la fecha y hora en formato "DD/MM/YYYY --- HH:mm:ss"
      const day = String(boliviaTime.getDate()).padStart(2, '0');
      const month = String(boliviaTime.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
      const year = boliviaTime.getFullYear();
      const hours = String(boliviaTime.getHours()).padStart(2, '0');
      const minutes = String(boliviaTime.getMinutes()).padStart(2, '0');
      const seconds = String(boliviaTime.getSeconds()).padStart(2, '0');

      return `${day}/${month}/${year} --- ${hours}:${minutes}:${seconds}`;
    },
  },
});

const Sensor = model('Sensor', sensorSchema);

export default Sensor;
