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
const express_1 = __importDefault(require("express"));
const errorModel_1 = __importDefault(require("../models/errorModel"));
const router = express_1.default.Router();
//@ts-ignore
router.post("/update-error", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sensorTemperatura } = req.body;
        if (!sensorTemperatura) {
            return res.status(400).json({ message: "La temperatura es requerida" });
        }
        const existingError = yield errorModel_1.default.findOne();
        if (existingError) {
            existingError.sensorTemperatura = sensorTemperatura;
            existingError.fecha = new Date().toLocaleTimeString("en-GB", { timeZone: "America/La_Paz" });
            yield existingError.save();
            return res.status(200).json({ message: "Registro actualizado", data: existingError });
        }
        else {
            const newError = new errorModel_1.default({
                sensorTemperatura,
            });
            yield newError.save();
            return res.status(201).json({ message: "Nuevo registro agregado", data: newError });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al procesar la solicitud" });
    }
}));
exports.default = router;
