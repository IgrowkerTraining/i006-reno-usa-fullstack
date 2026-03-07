import prisma from "../lib/prisma.js";

export const createTask = async (data) => {
  return await prisma.task.create({
    data: {
      name: data.name,
      description: data.description,
      phaseId: data.phaseId,
      tradeId: data.tradeId,
    },
  });
};

export const getTasks = async () => {
  return await prisma.task.findMany({
    include: {
      phase: true,
      trade: true,
      executedTasks: true,
    },
  });
};

export const getTaskById = async (id) => {
  return await prisma.task.findUnique({
    where: { id },
    include: {
      executedTasks: true,
    },
  });
};

export const deleteTask = async (id) => {
  return await prisma.task.delete({
    where: { id },
  });
};