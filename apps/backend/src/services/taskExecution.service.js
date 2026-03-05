import prisma from "../lib/prisma.js";
import TaskExecution from "../models/TaskExecution.js";

export const createTaskExecution = async (data) => {
  const { taskId, dailyLogId, progressPercentage } = data;

  // 1️⃣ Validaciones básicas
  if (!taskId || !dailyLogId) {
    throw new Error("taskId and dailyLogId are required");
  }

  // Validar rango de progreso si viene definido
  if (
    progressPercentage !== undefined &&
    (progressPercentage < 0 || progressPercentage > 100)
  ) {
    throw new Error("progressPercentage must be between 0 and 100");
  }

  // 2️⃣ Verificar existencia de Task
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  // 3️⃣ Verificar existencia de DailyLog
  const dailyLog = await prisma.dailyLog.findUnique({
    where: { id: dailyLogId },
  });

  if (!dailyLog) {
    throw new Error("DailyLog not found");
  }

  // 4️⃣ Regla de negocio: evitar duplicados
  const existing = await prisma.taskExecution.findFirst({
    where: { taskId, dailyLogId },
  });

  if (existing) {
    throw new Error("Task already registered in this DailyLog");
  }

  // 5️⃣ Crear entidad
  const instance = TaskExecution.create(data);

  // 6️⃣ Persistir en base
  return await prisma.taskExecution.create({
    data: instance.toJSON(),
    include: {
      task: true,
      dailyLog: true,
    },
  });
};

export const getTaskExecutions = async (filter = {}) => {
  const where = {};

  if (filter.taskId) where.taskId = filter.taskId;
  if (filter.dailyLogId) where.dailyLogId = filter.dailyLogId;

  return await prisma.taskExecution.findMany({
    where,
    include: {
      task: true,
      dailyLog: true,
    },
  });
};

export const getTaskExecutionById = async (id) => {
  return await prisma.taskExecution.findUnique({
    where: { id },
    include: {
      task: true,
      dailyLog: true,
    },
  });
};

export const deleteTaskExecution = async (id) => {
  const existing = await prisma.taskExecution.findUnique({
    where: { id },
  });

  if (!existing) return null;

  return await prisma.taskExecution.delete({
    where: { id },
  });
};