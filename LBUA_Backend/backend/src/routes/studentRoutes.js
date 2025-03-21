// backend/src/routes/studentRoutes.js
import express from 'express';
import { viewLabs, requestLab, viewMyRequests } from '../controllers/studentController.js';
import { protect, studentOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/labs', protect, studentOnly, viewLabs);
router.post('/labs/:id/request', protect, studentOnly, requestLab);
router.get('/requests', protect, studentOnly, viewMyRequests);

export default router;
