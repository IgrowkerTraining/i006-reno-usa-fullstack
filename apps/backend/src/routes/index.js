import express from 'express';
import authRoutes from './auth.routes.js';
import healthRoutes from './health.js';
import projectsRoutes from './project.routes.js';
import tradesRoutes from './trade.routes.js';
import aiRoutes from './ai.routes.js';
import phaseRoutes from "./phase.routes.js";
import taskRoutes from "./task.routes.js";

const router = express.Router();

// Montaje de todas las rutas
router.use('/auth', authRoutes);
router.use('/health', healthRoutes);
router.use('/projects', projectsRoutes);
router.use('/trades', tradesRoutes);
router.use('/ai', aiRoutes);
router.use('/phases', phaseRoutes);
router.use('/tasks', taskRoutes);

export default router;
