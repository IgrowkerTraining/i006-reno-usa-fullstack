import { Router } from "express";
import { generateReport } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/ai/analyze/{projectId}:
 * post:
 * summary: Genera un reporte de IA basado en el estado actual del proyecto
 * tags: [AI Analysis]
 * security:
 * - cookieAuth: []
 * parameters:
 * - in: path
 * name: projectId
 * required: true
 * schema:
 * type: string
 */
router.post("/analyze/:projectId", protect, authorize("ADMIN", "PROFESSIONAL"), generateReport);

export default router;