import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/task.service.js";
import { mapTask } from "../mappers/task.mapper.js";

/**
 * Crear Task
 */
export const create = async (req, res, next) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json(mapTask(task));
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener todas las Tasks
 */
export const getAll = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.phaseId) filter.phaseId = req.query.phaseId;
    if (req.query.tradeId) filter.tradeId = req.query.tradeId;

    const tasks = await getTasks(filter);
    res.json(tasks.map(mapTask));
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener Task por ID
 */
export const getOne = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(mapTask(task));
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar Task
 */
export const update = async (req, res, next) => {
  try {
    const task = await updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(mapTask(task));
  } catch (error) {
    next(error);
  }
};

/**
 * Eliminar Task
 */
export const remove = async (req, res, next) => {
  try {
    const deleted = await deleteTask(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};