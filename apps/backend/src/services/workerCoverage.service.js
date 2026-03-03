import prisma from "../lib/prisma.js";
import WorkerCoverage from "../models/WorkerCoverage.js";

export const createWorkerCoverage = async (data) => {
  const { coverage_status, coverage_type, dailyLogId } = data;
  if (!coverage_status || !coverage_type || !dailyLogId) {
    throw new Error("Missing required fields");
  }

  const instance = WorkerCoverage.create(data);
  return await prisma.workerCoverage.create({
    data: instance.toJSON(),
  });
};

export const getWorkerCoverages = async (dailyLogId) => {
  const where = {};
  if (dailyLogId) where.dailyLogId = dailyLogId;
  return await prisma.workerCoverage.findMany({ where });
};

export const getWorkerCoverageById = async (id) => {
  return await prisma.workerCoverage.findUnique({ where: { id } });
};

export const updateWorkerCoverage = async (id, data) => {
  const existing = await prisma.workerCoverage.findUnique({ where: { id } });
  if (!existing) return null;
  return await prisma.workerCoverage.update({ where: { id }, data });
};

export const deleteWorkerCoverage = async (id) => {
  const existing = await prisma.workerCoverage.findUnique({ where: { id } });
  if (!existing) return null;
  return await prisma.workerCoverage.delete({ where: { id } });
};
