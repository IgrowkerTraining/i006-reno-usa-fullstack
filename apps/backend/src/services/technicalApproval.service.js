import prisma from "../lib/prisma.js";
import TechnicalApproval from "../models/TechnicalApproval.js";

export const createTechnicalApproval = async (data) => {
  const { status, phaseId, userId } = data;
  if (!status || !phaseId || !userId) {
    throw new Error("Missing required fields: status, phaseId, userId");
  }

  const instance = TechnicalApproval.create(data);
  return await prisma.technicalApproval.create({
    data: instance.toJSON(),
  });
};

export const getTechnicalApprovals = async (filter = {}) => {
  const where = {};
  if (filter.phaseId) where.phaseId = filter.phaseId;
  if (filter.userId) where.userId = filter.userId;
  return await prisma.technicalApproval.findMany({ where });
};

export const getTechnicalApprovalById = async (id) => {
  return await prisma.technicalApproval.findUnique({ where: { id } });
};

export const updateTechnicalApproval = async (id, data) => {
  const existing = await prisma.technicalApproval.findUnique({ where: { id } });
  if (!existing) return null;
  return await prisma.technicalApproval.update({ where: { id }, data });
};

export const deleteTechnicalApproval = async (id) => {
  const existing = await prisma.technicalApproval.findUnique({ where: { id } });
  if (!existing) return null;
  return await prisma.technicalApproval.delete({ where: { id } });
};
