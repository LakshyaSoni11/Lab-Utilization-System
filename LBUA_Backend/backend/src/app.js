// backend/src/app.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import adminRoutes from './routes/adminRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/student', studentRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Lab Management System API is running' });
});

export default app;
