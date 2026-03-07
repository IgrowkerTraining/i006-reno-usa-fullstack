import {
  createTask,
  getTasks,
  getTaskById,
  deleteTask,
} from "../services/task.service.js";

export const create = async (req, res, next) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json({
      status: "success",
      payload: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const tasks = await getTasks();
    res.json({
      status: "success",
      payload: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);
    res.json({
      status: "success",
      payload: task,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const task = await deleteTask(req.params.id);
    res.json({
      status: "success",
      payload: task,
    });
  } catch (error) {
    next(error);
  }
};