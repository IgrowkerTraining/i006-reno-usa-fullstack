import prisma from "../lib/prisma.js";
import Project from "../models/Project.js";
import { mapProject } from "../mappers/project.mapper.js";

/* =========================
   INCLUDE CENTRALIZADO
========================= */
const projectFullInclude = {
  phases: {
    include: {
      tasks: {
        include: {
          executedTasks: {
            include: {
              dailyLog: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  },
  projectSnapshots: true,
};

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
    internal_code,
    category,
    initial_status,
    assigned_professional,
    project_team,
    trades,
    project_plan_photo,
    userId,
  } = data;

  if (!name || !location || !userId) {
    throw new Error("Missing required fields");
  }

  const projectInstance = Project.create(data);

  const project = await prisma.project.create({
    data: {
      code: projectInstance.code,
      internal_code,
      name,
      category,
      location,
      surface_sqft,
      structure_type,
      intervention_type,
      initial_status,
      assigned_professional,
      project_team: project_team || [],
      trades: trades || [],
      project_plan_photo,
      userId,
    },
    include: projectFullInclude,
  });

  return mapProject(project);
};

/* =========================
   Leer todos los proyectos del usuario logueado
========================= */
export const getProjects = async (userId) => {
  const projects = await prisma.project.findMany({
    where: { userId },
    include: projectFullInclude,
  });

  return projects.map(mapProject);
};

/* =========================
   Leer unico proyecto (solo si pertenece al usuario)
========================= */
export const getProjectById = async (id, userId) => {
  const project = await prisma.project.findFirst({
    where: {
      id,
      userId, // 🔒 Seguridad multi-tenant
    },
    include: projectFullInclude,
  });

  if (!project) {
    return null;
  }

  return mapProject(project);
};

/* =========================
   Actualizar proyecto (solo si pertenece al usuario)
========================= */
export const updateProject = async (id, userId, data) => {
  const existing = await prisma.project.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    return null;
  }

  const updated = await prisma.project.update({
    where: { id },
    data,
    include: projectFullInclude,
  });

  return mapProject(updated);
};

/* =========================
   Eliminar proyecto (solo si pertenece al usuario)
========================= */
export const deleteProject = async (id, userId) => {
  const existing = await prisma.project.findFirst({
    where: { id, userId },
  });

  if (!existing) {
    return null;
  }

  return await prisma.project.delete({
    where: { id },
  });
};