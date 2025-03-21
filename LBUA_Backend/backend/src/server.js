// backend/src/server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import envConfig from './config/env.js';
import adminRoutes from './routes/adminRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

// Initialize dotenv
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/student', studentRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = envConfig.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
