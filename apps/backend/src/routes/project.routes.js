import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  getProjectDashboardMetrics,
  getPhases,
  getHistory
} from "../controllers/projectController.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management endpoints
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectResponse'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, authorize("professional"), create);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects of logged user
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectResponse'
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, authorize("professional", "user"), getAll);

/**
 * @swagger
 * /api/projects/{id}/metrics:
 *   get:
 *     summary: Get dashboard metrics (progress, duration, active trades) for a project
 *     tags: [Projects]
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
 *         description: Project metrics retrieved successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id/metrics", protect, authorize("professional", "user"), getProjectDashboardMetrics);

/**
 * @swagger
 * /api/projects/{id}/phases:
 *   get:
 *     summary: Get all phases (stages) of a project ordered by date
 *     tags: [Projects]
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
 *         description: Project phases retrieved successfully
 */
router.get("/:id/phases", protect, authorize("professional", "user"), getPhases);

/**
 * @swagger
 * /api/projects/{id}/history:
 *   get:
 *     summary: Get recently completed tasks (record history) for a project
 *     tags: [Projects]
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
 *         description: Project history retrieved successfully
 */
router.get("/:id/history", protect, authorize("professional", "user"), getHistory);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID (only if belongs to user)
 *     tags: [Projects]
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
 *         description: Project found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectResponse'
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */

router.get("/:id", protect, authorize("professional", "user"), getOne);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update project (only if belongs to user)
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectResponse'
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", protect, authorize("professional"), update);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project (only if belongs to user)
 *     tags: [Projects]
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
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Project deleted successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", protect, authorize("professional"), remove);

export default router;