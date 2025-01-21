"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sensorModel_1 = __importDefault(require("../models/sensorModel"));
const router = (0, express_1.Router)();
//@ts-ignore
router.post('/sensor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { temperature, humidity } = req.body;
        if (temperature === undefined || humidity === undefined) {
            return res.status(400).json({ message: 'Temperatura, humedad y estado son requeridos.' });
        }
        const newSensor = new sensorModel_1.default({ temperature, humidity, estado: true });
        yield newSensor.save();
        return res.status(201).json({ message: 'Datos guardados', sensor: newSensor });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    }
}));
//@ts-ignore
router.get('/sensor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sensors = yield sensorModel_1.default.find();
        return res.status(200).json(sensors);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    }
}));
exports.default = router;
