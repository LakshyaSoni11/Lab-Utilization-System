// backend/src/config/env.js
import dotenv from 'dotenv';
dotenv.config();

const requiredEnv = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'JWT_SECRET', 'PORT'];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Error: Missing environment variable ${key}`);
    process.exit(1);
  }
});

export default {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT || 5432,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
};
