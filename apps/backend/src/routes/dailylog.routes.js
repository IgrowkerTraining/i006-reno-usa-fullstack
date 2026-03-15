import { Router } from "express";
import { create, getAll, getById, remove } from "../controllers/dailylog.controller.js";

const router = Router();

/**
 * @swagger
 * /api/dailylogs:
 *   post:
 *     summary: Create Daily Log
 *     tags: [DailyLogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             phaseId: "PHASE_ID"
 *             userId: "USER_ID"
 *             notes: "Work progressing well"
 *             completion_percentage: 50
 *             schedule_deviation: 0
 *     responses:
 *       201:
 *         description: DailyLog created
 */
router.post("/", create);

/**
 * @swagger
 * /api/dailylogs:
 *   get:
 *     summary: Get all DailyLogs
 *     tags: [DailyLogs]
 */
router.get("/", getAll);

router.get("/:id", getById);

router.delete("/:id", remove);

export default router;