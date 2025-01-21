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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI || "");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    //await mongoose.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
}));
const endpoint = "/api/";
describe('POST /register', () => {
    it('Deberia registrar un nuevo usuario', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post(endpoint + 'register')
            .send({ email: 'testuser@example.com', password: 'password123' });
        yield userModel_1.default.deleteOne({ email: 'testuser@example.com' });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Usuario registrado satisfactoriamente');
    }));
    it('Deberia retornar 400 si el usuario existe', () => __awaiter(void 0, void 0, void 0, function* () {
        yield new userModel_1.default({ email: 'testuser@example.com', password: 'password123' }).save();
        const response = yield (0, supertest_1.default)(index_1.default)
            .post(endpoint + 'register')
            .send({ email: 'testuser@example.com', password: 'newpassword' });
        yield userModel_1.default.deleteOne({ email: 'testuser@example.com' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('El usuario ya existe');
    }));
    it('Deberia retornar 500 si hay algun error', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = jest.spyOn(userModel_1.default.prototype, 'save').mockImplementationOnce(() => {
            return Promise.reject(new Error('Database error'));
        });
        const response = yield (0, supertest_1.default)(index_1.default)
            .post(endpoint + 'register')
            .send({ email: 'testuser@example1.com', password: 'password123' });
        expect(response.status).toBe(500);
        expect(response.body.error).toBeDefined();
        mockError.mockRestore();
    }));
});
describe('POST /login', () => {
    it('Deberia iniciar sesion y retornar un token', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new userModel_1.default({ email: 'testuser@example.com', password: 'password123' });
        yield user.save();
        const response = yield (0, supertest_1.default)(index_1.default)
            .post(endpoint + 'login')
            .send({ email: 'testuser@example.com', password: 'password123' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Inicio de sesion correcto');
        yield userModel_1.default.deleteOne({ email: 'testuser@example.com' });
    }));
    it('Deberia retornar 400 si la contraseña o el email son incorrectos', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post(endpoint + 'login')
            .send({ email: 'nonexistentuser@example.com', password: 'wrongpassword' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email o contraseña invalida');
    }));
});
describe('POST /change-password', () => {
    it('should update the password successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new userModel_1.default({ email: 'testuser@example.com', password: 'password123' });
        yield user.save(); // Guardar usuario
        const response = yield (0, supertest_1.default)(index_1.default)
            .post(endpoint + 'change-password')
            .send({ email: 'testuser@example.com', oldPassword: 'password123', newPassword: 'newpassword123' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Contraseña actualizada correctamente');
        // Verificar si la contraseña fue cambiada
        const updatedUser = yield userModel_1.default.findOne({ email: 'testuser@example.com' });
        const isPasswordValid = yield (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.comparePassword('newpassword123'));
        expect(isPasswordValid).toBe(true);
        yield userModel_1.default.deleteOne({ email: 'testuser@example.com' }); // Limpiar después del test
    }));
    it('should return 400 if the old password is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new userModel_1.default({ email: 'testuser@example.com', password: 'password123' });
        yield user.save(); // Guardar usuario
        const response = yield (0, supertest_1.default)(index_1.default)
            .post(endpoint + 'change-password')
            .send({ email: 'testuser@example.com', oldPassword: 'wrongpassword', newPassword: 'newpassword123' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Credenciales invalidas');
        yield userModel_1.default.deleteOne({ email: 'testuser@example.com' }); // Limpiar después del test
    }));
});
