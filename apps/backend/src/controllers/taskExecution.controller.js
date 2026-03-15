// src/controllers/taskExecution.controller.js

import * as taskExecutionService from "../services/taskExecution.service.js";
import { mapTask } from "../mappers/task.mapper.js";

// ================= CREATE =================
export const create = async (req, res, next) => {
  console.log("=== LLEGÓ PETICIÓN CREATE TASK EXECUTION ===");
  console.log("Body recibido:", req.body);
  console.log("Headers:", req.headers);

  try {
    const execution = await taskExecutionService.createTaskExecution(req.body);
    console.log("TaskExecution creada:", execution);

    const taskWithHistory = mapTask(execution.task);
    console.log("Task mapeada con record_history:", taskWithHistory);

    res.status(201).json({
      id: execution.id,
      taskId: execution.taskId,
      dailyLogId: execution.dailyLogId,
      progressPercentage: execution.progressPercentage,
      task: taskWithHistory,
      dailyLog: execution.dailyLog,
    });
  } catch (error) {
    console.error("❌ ERROR EN CREATE TASK EXECUTION:", error.message);

    if (
      error.message === "Task not found" ||
      error.message === "DailyLog not found" ||
      error.message === "Task already registered in this DailyLog"
    ) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ================= GET ALL =================
export const getAll = async (req, res, next) => {
  console.log("=== LLEGÓ PETICIÓN GET ALL TASK EXECUTIONS ===");
  console.log("Query params:", req.query);

  try {
    const filter = {};
    if (req.query.taskId) filter.taskId = parseInt(req.query.taskId);
    if (req.query.dailyLogId) filter.dailyLogId = parseInt(req.query.dailyLogId);

    const list = await taskExecutionService.getTaskExecutions(filter);
    console.log("TaskExecutions obtenidas:", list);

    const mappedList = list.map((exec) => ({
      id: exec.id,
      taskId: exec.taskId,
      dailyLogId: exec.dailyLogId,
      progressPercentage: exec.progressPercentage,
      task: mapTask(exec.task),
      dailyLog: exec.dailyLog,
    }));

    console.log("TaskExecutions mapeadas:", mappedList);
    res.json(mappedList);
  } catch (error) {
    console.error("❌ ERROR EN GET ALL TASK EXECUTIONS:", error);
    next(error);
  }
};

// ================= GET ONE =================
export const getOne = async (req, res, next) => {
  console.log("=== LLEGÓ PETICIÓN GET ONE TASK EXECUTION ===");
  console.log("Params recibidos:", req.params);

  try {
    const execution = await taskExecutionService.getTaskExecutionById(
      parseInt(req.params.id)
    );
    console.log("TaskExecution encontrada:", execution);

    if (!execution) {
      console.log("❌ TaskExecution no encontrada, devuelvo 404");
      return res.status(404).json({ message: "TaskExecution not found" });
    }

    res.json({
      id: execution.id,
      taskId: execution.taskId,
      dailyLogId: execution.dailyLogId,
      progressPercentage: execution.progressPercentage,
      task: mapTask(execution.task),
      dailyLog: execution.dailyLog,
    });
  } catch (error) {
    console.error("❌ ERROR EN GET ONE TASK EXECUTION:", error);
    next(error);
  }
};

// ================= DELETE =================
export const remove = async (req, res, next) => {
  console.log("=== LLEGÓ PETICIÓN DELETE TASK EXECUTION ===");
  console.log("Params recibidos:", req.params);

  try {
    const deleted = await taskExecutionService.deleteTaskExecution(
      parseInt(req.params.id)
    );
    console.log("Resultado delete:", deleted);

    if (!deleted) {
      console.log("❌ TaskExecution no encontrada para borrar, devuelvo 404");
      return res.status(404).json({ message: "TaskExecution not found" });
    }

    res.json({ message: "TaskExecution deleted successfully" });
  } catch (error) {
    console.error("❌ ERROR EN DELETE TASK EXECUTION:", error);
    next(error);
  }
};