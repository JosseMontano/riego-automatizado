import { Schema, model } from "mongoose";

const errorSchema = new Schema({
  fecha: {
    type: String,
    default: () => {
      const now = new Date();
      const boliviaTime = new Date(now.getTime() - (4 * 3600000)); 
      return boliviaTime.toTimeString().split(' ')[0]; 
    },
  },
  sensorTemperatura: {
    type: String,
    required: true,
  },
});

const ErrorModel = model("Error", errorSchema);

export default ErrorModel;