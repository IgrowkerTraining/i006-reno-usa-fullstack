import prisma from "../lib/prisma.js";

export const createDailyLog = async (data) => {
  return await prisma.dailyLog.create({
    data: {
      notes: data.notes,
      completion_percentage: data.completion_percentage,
      schedule_deviation: data.schedule_deviation,
      userId: data.userId,
      phaseId: data.phaseId,
    },
  });
};

export const getDailyLogs = async () => {
  return await prisma.dailyLog.findMany({
    include: {
      incidents: true,
      safetyMeasures: true,
      executedTasks: true,
    },
  });
};

export const getDailyLogById = async (id) => {
  return await prisma.dailyLog.findUnique({
    where: { id },
    include: {
      executedTasks: true,
    },
  });
};

export const deleteDailyLog = async (id) => {
  return await prisma.dailyLog.delete({
    where: { id },
  });
};