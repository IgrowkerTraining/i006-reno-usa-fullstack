import express from 'express';
import authRoutes from './auth.routes.js';
import healthRoutes from './health.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/health', healthRoutes);

export default router;
