import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import sensorRoutes from './routes/sensorRoute';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use('/auth', authRoutes);
app.use('/api', sensorRoutes);

app.get('/', (_, res) => {
  res.send('PONG');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
