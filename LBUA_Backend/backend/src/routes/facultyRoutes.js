// backend/src/routes/facultyRoutes.js
import express from 'express';
import { createRequest, getMyRequests, cancelRequest } from '../controllers/facultyController.js';
import { protect, facultyOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/requests', protect, facultyOnly, createRequest);
router.get('/requests', protect, facultyOnly, getMyRequests);
router.delete('/requests/:id', protect, facultyOnly, cancelRequest);

export default router;
