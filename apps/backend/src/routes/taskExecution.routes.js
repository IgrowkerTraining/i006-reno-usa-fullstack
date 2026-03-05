import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  remove,
} from "../controllers/taskExecution.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: TaskExecutions
 *   description: Task execution tracking
 */

/**
 * @swagger
 * /api/task-executions:
 *   post:
 *     summary: Create a new task execution
 *     description: Links a Task with a DailyLog (both IDs are required)
 *     tags: [TaskExecutions]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskExecutionInput'
 *     responses:
 *       201:
 *         description: Task execution created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskExecutionResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, create);

/**
 * @swagger
 * /api/task-executions:
 *   get:
 *     summary: Get all task executions
 *     tags: [TaskExecutions]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of task executions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskExecutionResponse'
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getAll);

/**
 * @swagger
 * /api/task-executions/{id}:
 *   get:
 *     summary: Get task execution by ID
 *     tags: [TaskExecutions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task execution found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskExecutionResponse'
 *       404:
 *         description: Task execution not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", protect, getOne);

/**
 * @swagger
 * /api/task-executions/{id}:
 *   delete:
 *     summary: Delete task execution
 *     tags: [TaskExecutions]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task execution deleted successfully
 *       404:
 *         description: Task execution not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", protect, remove);

export default router;