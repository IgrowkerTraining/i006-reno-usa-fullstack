import { Router } from "express";
import { create, getAll, getById, remove } from "../controllers/task.controller.js";

const router = Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create Task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Install windows"
 *             description: "Install aluminum windows"
 *             phaseId: "PHASE_ID"
 *             tradeId: "TRADE_ID"
 *     responses:
 *       201:
 *         description: Task created
 */
router.post("/", create);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 */
router.get("/", getAll);

router.get("/:id", getById);

router.delete("/:id", remove);

export default router;