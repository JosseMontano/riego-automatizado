"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sensorSchema = new mongoose_1.Schema({
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    estado: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now },
});
const Sensor = (0, mongoose_1.model)('Sensor', sensorSchema);
exports.default = Sensor;
