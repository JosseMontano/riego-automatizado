import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute";
import sensorRoutes from "./routes/sensorRoute";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

 /* cors */
 app.use(
  cors({
    credentials: true,
    origin: true, // Permitir cualquier origen
  })
);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("error al conectar con MongoDB: ", error);
});

 app.use("/api", authRoutes);
app.use("/api", sensorRoutes);

app.get("/", (_, res) => {
  res.send("Bienvenido al servidor de riego automatizado");
});

app.listen(PORT, () => {
  console.log(`El servidor esta listo en el puerto ${PORT}`);
});

export default app;