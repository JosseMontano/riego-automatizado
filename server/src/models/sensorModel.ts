import { Schema, model } from 'mongoose';

const sensorSchema = new Schema({
  temperature: { type: Number, required: true },  
  humidity: { type: Number, required: true },     
  estado: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now }, 
});

const Sensor = model('Sensor', sensorSchema);

export default Sensor;
