import prisma from "../lib/prisma.js";
import Task from "../models/Task.js";

/**
 * Crear una nueva Task
 */
export const createTask = async (data) => {
  const { name, phaseId, tradeId } = data;
  if (!name || !phaseId || !tradeId) {
    throw new Error("Missing required fields: name, phaseId and tradeId");
  }

  const taskInstance = Task.create(data);
  return await prisma.task.create({
    data: taskInstance.toJSON(),
  });
};

/**
 * Obtener todas las tasks opcionalmente filtradas por phaseId o tradeId
 * Incluye executedTasks con dailyLog.user para construir record_history
 */
export const getTasks = async (filter = {}) => {
  const where = {};
  if (filter.phaseId) where.phaseId = filter.phaseId;
  if (filter.tradeId) where.tradeId = filter.tradeId;

  return await prisma.task.findMany({
    where,
    include: {
      executedTasks: {
        include: {
          dailyLog: { include: { user: true } }, // necesario para record_history
        },
      },
    },
  });
};

/**
 * Obtener una Task por ID incluyendo ejecutadas para record_history
 */
export const getTaskById = async (id) => {
  return await prisma.task.findUnique({
    where: { id },
    include: {
      executedTasks: {
        include: {
          dailyLog: { include: { user: true } },
        },
      },
    },
  });
};

/**
 * Actualizar una Task
 */
export const updateTask = async (id, data) => {
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return null;

  return await prisma.task.update({ where: { id }, data });
};

/**
 * Eliminar una Task
 */
export const deleteTask = async (id) => {
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return null;

  return await prisma.task.delete({ where: { id } });
};