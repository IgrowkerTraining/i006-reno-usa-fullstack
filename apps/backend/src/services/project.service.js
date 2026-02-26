import prisma from "../lib/prisma.js";
import Project from "../models/Project.js";

/* =========================
   Crear proyecto
========================= */
export const createProject = async (data) => {
  const {
    name,
    location,
    surface_sqft,
    structure_type,
    intervention_type,
    userId,
  } = data;

  if (!name || !location || !userId) {
    throw new Error("Missing required fields");
  }

  const projectInstance = Project.create(data);

  return await prisma.project.create({
    data: {
      code: projectInstance.code,
      name,
      location,
      surface_sqft,
      structure_type,
      intervention_type,
      userId,
    },
  });
};

/* =========================
   Leer todos los proyectos del usuario logueado
========================= */
export const getProjects = async (userId) => {
  return await prisma.project.findMany({
    where: { userId }, // 🔒 FILTRADO POR USUARIO
    include: {
      phases: true,
    },
  });
};

/* =========================
   Leer unico proyecto (solo si pertenece al usuario)
========================= */
export const getProjectById = async (id, userId) => {
  const project = await prisma.project.findFirst({
    where: {
      id,
      userId, // 🔒 DOBLE CONDICIÓN
    },
    include: {
      phases: true,
    },
  });

  if (!project) {
    return null; // el controller maneja el 404
  }

  return project;
};

/* =========================
   Actualizar proyecto (solo si pertenece al usuario)
========================= */
export const updateProject = async (id, userId, data) => {
  const existing = await prisma.project.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existing) {
    return null;
  }

  return await prisma.project.update({
    where: { id },
    data,
  });
};

/* =========================
   Eliminar proyecto (solo si pertenece al usuario)
========================= */
export const deleteProject = async (id, userId) => {
  const existing = await prisma.project.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existing) {
    return null;
  }

  return await prisma.project.delete({
    where: { id },
  });
};