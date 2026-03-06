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
   Crear proyecto + fases + dailyLogs automáticos
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

  // Crear proyecto
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

  // Generar fases automáticas al crear el proyecto
  const defaultPhases = [
    { name: "Planning", description: "Initial planning phase" },
    { name: "Execution", description: "Main execution phase" },
    { name: "Closing", description: "Project closing phase" },
  ];

  const now = new Date();

  await Promise.all(
    defaultPhases.map(async (phase) => {
      const newPhase = await prisma.phase.create({
        data: {
          name: phase.name,
          description: phase.description,
          projectId: project.id,
          planned_start: now,
          planned_end: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
          status: "pending",
        },
      });

      // Crear DailyLog inicial para cada fase
      await prisma.dailyLog.create({
        data: {
          phaseId: newPhase.id,
          userId,
          notes: "DailyLog inicial generado automáticamente",
          log_date: now,
          completion_percentage: 0,
          schedule_deviation: 0,
        },
      });

      return newPhase;
    })
  );

  // Refrescar proyecto con fases y dailyLogs
  const projectWithPhases = await prisma.project.findUnique({
    where: { id: project.id },
    include: projectFullInclude,
  });

  return mapProject(projectWithPhases);
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
   Leer único proyecto (solo si pertenece al usuario)
========================= */
export const getProjectById = async (id, userId) => {
  const project = await prisma.project.findFirst({
    where: { id, userId },
    include: projectFullInclude,
  });

  if (!project) return null;

  return mapProject(project);
};

/* =========================
   Actualizar proyecto
========================= */
export const updateProject = async (id, userId, data) => {
  const existing = await prisma.project.findFirst({ where: { id, userId } });
  if (!existing) return null;

  const updated = await prisma.project.update({
    where: { id },
    data,
    include: projectFullInclude,
  });

  return mapProject(updated);
};

/* =========================
   Eliminar proyecto
========================= */
export const deleteProject = async (id, userId) => {
  const existing = await prisma.project.findFirst({ where: { id, userId } });
  if (!existing) return null;

  return await prisma.project.delete({ where: { id } });
};