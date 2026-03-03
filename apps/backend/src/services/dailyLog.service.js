import prisma from "../lib/prisma.js";
import DailyLog from "../models/DailyLog.js";

export const createDailyLog = async (data) => {
  const { phaseId, userId } = data;
  if (!phaseId || !userId) {
    throw new Error("Missing required fields: phaseId, userId");
  }

  const instance = DailyLog.create(data);
  return await prisma.dailyLog.create({
    data: instance.toJSON(),
  });
};

export const getDailyLogs = async (filter = {}) => {
  const where = {};
  if (filter.phaseId) where.phaseId = filter.phaseId;
  if (filter.userId) where.userId = filter.userId;
  return await prisma.dailyLog.findMany({ where });
};

export const getDailyLogById = async (id) => {
  return await prisma.dailyLog.findUnique({ where: { id } });
};

export const updateDailyLog = async (id, data) => {
  const existing = await prisma.dailyLog.findUnique({ where: { id } });
  if (!existing) return null;
  return await prisma.dailyLog.update({ where: { id }, data });
};

export const deleteDailyLog = async (id) => {
  const existing = await prisma.dailyLog.findUnique({ where: { id } });
  if (!existing) return null;
  return await prisma.dailyLog.delete({ where: { id } });
};
