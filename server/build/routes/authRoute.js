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
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'secret';
const router = (0, express_1.Router)();
//@ts-ignore
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        const newUser = new userModel_1.default({ email, password });
        yield newUser.save();
        res.status(201).json({ message: 'Usuario registrado satisfactoriamente' });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
//@ts-ignore
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user || !(yield user.comparePassword(password))) {
            return res.status(400).json({ message: 'Email o contraseña invalida' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
//@ts-ignore
router.post('/change-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPassword, newPassword } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user || !(yield user.comparePassword(oldPassword))) {
            return res.status(400).json({ message: 'Credenciales invalidas' });
        }
        user.password = newPassword;
        yield user.save();
        res.json({ message: 'Contraseña actualizada correctamente' });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.default = router;
