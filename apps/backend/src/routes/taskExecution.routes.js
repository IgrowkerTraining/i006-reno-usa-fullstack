import { Router } from "express";
import { create } from "../controllers/taskExecution.controller.js";

const router = Router();

/**
 * @swagger
 * /api/task-executions:
 *   post:
 *     summary: Create Task Execution
 *     tags: [TaskExecutions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskExecutionInput'
 *           example:
 *             taskId: "TASK_ID"
 *             dailyLogId: "DAILYLOG_ID"
 *             progressPercentage: 60
 *     responses:
 *       201:
 *         description: TaskExecution created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskExecutionResponse'
 */
router.post("/", create);

export default router;