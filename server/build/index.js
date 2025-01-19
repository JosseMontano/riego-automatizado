"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then(() => {
    console.log("Conectado a MongoDB");
})
    .catch((error) => {
    console.error("error al conectar con MongoDB: ", error);
});
/* app.use("/auth", authRoutes);
app.use("/api", sensorRoutes);
app.use("/api", sensorRoutes); */
exports.app.get("/", (_, res) => {
    res.send("Bienvenido al servidor de riego automatizado");
});
exports.app.listen(PORT, () => {
    console.log(`El servidor esta listo en el puerto ${PORT}`);
});
