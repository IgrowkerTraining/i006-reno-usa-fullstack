import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/tradeController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// CRUD for trades

/**
 * @swagger
 * tags:
 *   name: Trades
 *   description: Trade management
 */

/**
 * @swagger
 * /api/trades:
 *   post:
 *     summary: Create a new trade
 *     tags: [Trades]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TradeInput'
 *     responses:
 *       201:
 *         description: Trade created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TradeResponse'
 */
router.post("/", protect, create);

/**
 * @swagger
 * /api/trades:
 *   get:
 *     summary: List all trades
 *     tags: [Trades]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Array of trades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TradeResponse'
 */
router.get("/", protect, getAll);

/**
 * @swagger
 * /api/trades/{id}:
 *   get:
 *     summary: Get a trade by ID
 *     tags: [Trades]
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
 *         description: Trade
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TradeResponse'
 *       404:
 *         description: Not found
 */
router.get("/:id", protect, getOne);

/**
 * @swagger
 * /api/trades/{id}:
 *   put:
 *     summary: Update a trade
 *     tags: [Trades]
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
 *             $ref: '#/components/schemas/TradeInput'
 *     responses:
 *       200:
 *         description: Updated trade
 *       404:
 *         description: Not found
 */
router.put("/:id", protect, update);

/**
 * @swagger
 * /api/trades/{id}:
 *   delete:
 *     summary: Delete a trade
 *     tags: [Trades]
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
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete("/:id", protect, remove);

export default router;
