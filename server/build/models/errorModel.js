"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const errorSchema = new mongoose_1.Schema({
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
const ErrorModel = (0, mongoose_1.model)("Error", errorSchema);
exports.default = ErrorModel;
