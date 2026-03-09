import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { create, getAll, getById, remove, logProgress, getMyPendingTasks } from "../controllers/task.controller.js";

const router = Router();

/**
 * @swagger
 * /api/tasks/log-progress:
 *   patch:
 *     summary: Log task progress and auto-calculate incidences
 *     description: Recibe un array de IDs de tareas completadas por el obrero. Actualiza sus estados a "completed" y calcula automáticamente si se saltearon tareas anteriores para marcarlas como incidencias.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               taskIds: [
 *                 "cmxyz_id_de_tarea_1",
 *                 "cmxyz_id_de_tarea_3"
 *               ]
 *     responses:
 *       '200':
 *         description: Progreso guardado e incidencias calculadas correctamente
 *       '400':
 *         description: Se requiere un array válido de taskIds
 *       '404':
 *         description: No se encontraron las tareas especificadas
 *       '500':
 *         description: Error interno del servidor
 */
router.patch("/log-progress", protect, logProgress);

/**
 * @swagger
 * /api/tasks/my-pending-tasks:
 *   get:
 *     summary: Get pending tasks filtered by the logged-in user's trade
 *     description: Devuelve la lista de tareas pendientes o en progreso de un proyecto específico, filtradas automáticamente por el oficio (trade) del usuario autenticado.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del proyecto
 *     responses:
 *       '200':
 *         description: Lista de tareas pendientes obtenida con éxito
 *       '400':
 *         description: Falta el projectId en la query
 *       '401':
 *         description: No autorizado (falta token)
 *       '403':
 *         description: El usuario no tiene un oficio asignado
 */
router.get("/my-pending-tasks", protect, getMyPendingTasks);

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