import prisma from "../lib/prisma.js";
import SafetyMeasure from "../models/SafetyMeasure.js";

export const createSafetyMeasure = async (data) => {
  const { description, dailyLogId } = data;
  if (!description || !dailyLogId) {
    throw new Error("Missing required fields: description, dailyLogId");
  }

  const instance = SafetyMeasure.create(data);
  return await prisma.safetyMeasure.create({
    data: instance.toJSON(),
  });
};

export const getSafetyMeasures = async (dailyLogId) => {
  const where = {};
  if (dailyLogId) where.dailyLogId = dailyLogId;
  return await prisma.safetyMeasure.findMany({ where });
};

export const getSafetyMeasureById = async (id) => {
  return await prisma.safetyMeasure.findUnique({ where: { id } });
};

export const updateSafetyMeasure = async (id, data) => {
  const existing = await prisma.safetyMeasure.findUnique({ where: { id } });
  if (!existing) return null;
  return await prisma.safetyMeasure.update({ where: { id }, data });
};

export const deleteSafetyMeasure = async (id) => {
  const existing = await prisma.safetyMeasure.findUnique({ where: { id } });
  if (!existing) return null;
  return await prisma.safetyMeasure.delete({ where: { id } });
};
