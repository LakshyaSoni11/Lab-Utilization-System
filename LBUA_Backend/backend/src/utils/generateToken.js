// backend/src/utils/generateToken.js
import jwt from 'jsonwebtoken';
import envConfig from '../config/env.js';

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, envConfig.jwtSecret, {
    expiresIn: '1d', // Token valid for 1 day
  });
};

export default generateToken;
