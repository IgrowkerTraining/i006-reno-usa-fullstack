import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/phaseController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Phases
 *   description: Project phases management
 */

/**
 * @swagger
 * /api/phases:
 *   post:
 *     summary: Create phase
 *     tags: [Phases]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhaseInput'
 */
router.post("/", protect, create);

/**
 * @swagger
 * /api/phases:
 *   get:
 *     summary: Get all phases
 *     tags: [Phases]
 *     security:
 *       - cookieAuth: []
 */
router.get("/", protect, getAll);

/**
 * @swagger
 * /api/phases/{id}:
 *   get:
 *     summary: Get phase by ID
 *     tags: [Phases]
 *     security:
 *       - cookieAuth: []
 */
router.get("/:id", protect, getOne);

/**
 * @swagger
 * /api/phases/{id}:
 *   put:
 *     summary: Update phase
 *     tags: [Phases]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhaseInput'
 */
router.put("/:id", protect, update);

/**
 * @swagger
 * /api/phases/{id}:
 *   delete:
 *     summary: Delete phase
 *     tags: [Phases]
 *     security:
 *       - cookieAuth: []
 */
router.delete("/:id", protect, remove);

export default router;