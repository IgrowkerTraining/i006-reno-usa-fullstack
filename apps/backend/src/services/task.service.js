import prisma from "../lib/prisma.js";
import Task from "../models/Task.js";

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
 * Optionally filter by phaseId or tradeId.
 */
export const getTasks = async (filter = {}) => {
  const where = {};
  if (filter.phaseId) where.phaseId = filter.phaseId;
  if (filter.tradeId) where.tradeId = filter.tradeId;

  return await prisma.task.findMany({ where });
};

export const getTaskById = async (id) => {
  return await prisma.task.findUnique({ where: { id } });
};

export const updateTask = async (id, data) => {
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return null;
  return await prisma.task.update({ where: { id }, data });
};

export const deleteTask = async (id) => {
  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) return null;
  return await prisma.task.delete({ where: { id } });
};
