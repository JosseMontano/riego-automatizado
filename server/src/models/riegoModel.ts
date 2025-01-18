import mongoose, { Schema, Document } from 'mongoose';

export interface IRiego extends Document {
  fechaInicio: Date;
  sensorId: mongoose.Types.ObjectId;
  usuarioId: mongoose.Types.ObjectId;
}

const riegoSchema: Schema = new Schema({
  fechaInicio: { type: Date, required: true },
  sensorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sensor', required: true },  // Relación con Sensor
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Relación con Usuario
});

const Riego = mongoose.model<IRiego>('Riego', riegoSchema);

export default Riego;