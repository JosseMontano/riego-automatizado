"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const sensorRoute_1 = __importDefault(require("./routes/sensorRoute"));
const errorRoute_1 = __importDefault(require("./routes/errorRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
/* cors */
app.use((0, cors_1.default)({
    credentials: true,
    origin: true, // Permitir cualquier origen
}));
const PORT = process.env.PORT || 3000;
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then(() => {
    console.log("Conectado a MongoDB");
})
    .catch((error) => {
    console.error("error al conectar con MongoDB: ", error);
});
app.use("/api", authRoute_1.default);
app.use("/api", sensorRoute_1.default);
app.use("/api", errorRoute_1.default);
app.get("/", (_, res) => {
    res.send("Bienvenido al servidor de riego automatizado");
});
app.listen(PORT, () => {
    console.log(`El servidor esta listo en el puerto ${PORT}`);
});
exports.default = app;
