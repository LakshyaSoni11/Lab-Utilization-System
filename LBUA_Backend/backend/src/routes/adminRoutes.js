// backend/src/routes/adminRoutes.js
import express from 'express';
import { approveRequest, rejectRequest, getAllRequests } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/requests', protect, adminOnly, getAllRequests);
router.put('/requests/:id/approve', protect, adminOnly, approveRequest);
router.put('/requests/:id/reject', protect, adminOnly, rejectRequest);

export default router;
