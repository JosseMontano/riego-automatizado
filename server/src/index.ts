import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute";
import sensorRoutes from "./routes/sensorRoute";
import dotenv from "dotenv";

dotenv.config();

export const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("error al conectar con MongoDB: ", error);
});

app.use("/auth", authRoutes);
app.use("/api", sensorRoutes);
app.use("/api", sensorRoutes);

app.get("/", (_, res) => {
  res.send("Bienvenido al servidor de riego automatizado");
});

app.listen(PORT, () => {
  console.log(`El servidor esta listo en el puerto ${PORT}`);
});
