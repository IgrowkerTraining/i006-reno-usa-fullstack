import prisma from "../lib/prisma.js";
import Phase from "../models/Phase.js";

export const createPhase = async (data) => {
  const { name, planned_start, planned_end, projectId } = data;
  if (!name || !planned_start || !planned_end || !projectId) {
    throw new Error("Missing required fields");
  }
  const phaseInstance = Phase.create(data);
  return await prisma.phase.create({
    data: phaseInstance.toJSON(),
  });
};

/**
 * List phases, optionally scoped to a project
 */
export const getPhases = async (projectId) => {
  const where = {};
  if (projectId) where.projectId = projectId;
  return await prisma.phase.findMany({ where });
};

export const getPhaseById = async (id) => {
  return await prisma.phase.findUnique({ where: { id } });
};

export const updatePhase = async (id, data) => {
  const existing = await prisma.phase.findUnique({ where: { id } });
  if (!existing) return null;
  return await prisma.phase.update({ where: { id }, data });
};

export const deletePhase = async (id) => {
  const existing = await prisma.phase.findUnique({ where: { id } });
  if (!existing) return null;
  return await prisma.phase.delete({ where: { id } });
};
