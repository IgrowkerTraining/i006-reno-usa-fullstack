import prisma from "../lib/prisma.js";

export const createPhase = async (data) => {
  return await prisma.phase.create({
    data: {
      name: data.name,
      description: data.description,
      planned_start: new Date(data.planned_start),
      planned_end: new Date(data.planned_end),
      projectId: data.projectId,
    },
  });
};

export const getPhases = async () => {
  return await prisma.phase.findMany({
    include: {
      tasks: true,
      dailyLogs: true,
    },
  });
};

export const getPhaseById = async (id) => {
  return await prisma.phase.findUnique({
    where: { id: Number(id) },
    include: {
      tasks: true,
      dailyLogs: true,
    },
  });
};

export const deletePhase = async (id) => {
  return await prisma.phase.delete({
    where: { id: Number(id) },
  });
};