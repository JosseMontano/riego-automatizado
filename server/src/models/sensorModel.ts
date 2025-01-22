import { Schema, model } from 'mongoose';

const sensorSchema = new Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  estado: { type: Boolean, required: true },
  timestamp: {
    type: String, 
    default: () => {
      const now = new Date();
      const boliviaTime = new Date(now.getTime() - (4 * 3600000)); 
      return boliviaTime.toTimeString().split(' ')[0]; 
    },
  },
});

const Sensor = model('Sensor', sensorSchema);

export default Sensor;
