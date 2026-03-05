import {
  createTaskExecution,
  getTaskExecutions,
  getTaskExecutionById,
  deleteTaskExecution,
} from "../services/taskExecution.service.js";

import { mapTask } from "../mappers/task.mapper.js";

export const create = async (req, res, next) => {
  try {
    const execution = await createTaskExecution(req.body);
    const taskWithHistory = mapTask(execution.task);
    res.status(201).json(taskWithHistory);
  } catch (error) {
    // Manejar errores específicos de negocio
    if (
      error.message === "Task not found" ||
      error.message === "DailyLog not found" ||
      error.message === "Task already registered in this DailyLog"
    ) {
      return res.status(404).json({ error: error.message });
    }
    // Para otros errores inesperados
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAll = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.taskId) filter.taskId = req.query.taskId;
    if (req.query.dailyLogId) filter.dailyLogId = req.query.dailyLogId;

    const list = await getTaskExecutions(filter);
    // Mapear todas las tasks para incluir record_history
    const mappedList = list.map((exec) => mapTask(exec.task));
    res.json(mappedList);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const execution = await getTaskExecutionById(req.params.id);
    if (!execution) {
      return res.status(404).json({ message: "TaskExecution not found" });
    }
    const taskWithHistory = mapTask(execution.task);
    res.json(taskWithHistory);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await deleteTaskExecution(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "TaskExecution not found" });
    }
    res.json({ message: "TaskExecution deleted successfully" });
  } catch (error) {
    next(error);
  }
};