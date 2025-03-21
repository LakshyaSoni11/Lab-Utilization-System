// backend/src/routes/authRoutes.js
import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', protect, logoutUser);

export default router;
