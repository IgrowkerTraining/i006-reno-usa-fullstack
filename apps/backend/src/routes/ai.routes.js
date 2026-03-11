import { Router } from "express";
import { generateReport } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/ai/analyze/{projectId}:
 *   post:
 *     summary: Generar análisis de IA para un proyecto
 *     description: Recopila los datos del proyecto, genera el Snapshot y llama al servicio de Python para obtener un reporte.
 *     tags:
 *       - AI Analysis
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del proyecto
 *     responses:
 *       '201':
 *         description: Análisis generado y guardado exitosamente.
 *       '400':
 *         description: Error en la generación del reporte.
 */
router.post("/analyze/:projectId", protect, authorize("PROFESSIONAL"), generateReport);

export default router;