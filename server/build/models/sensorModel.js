"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sensorSchema = new mongoose_1.Schema({
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
const Sensor = (0, mongoose_1.model)('Sensor', sensorSchema);
exports.default = Sensor;
