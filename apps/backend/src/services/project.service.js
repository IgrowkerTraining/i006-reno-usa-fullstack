import prisma from "../lib/prisma.js";
import Project from "../models/Project.js";

export const createProject = async ({
  name,
  location,
  surface_sqft,
  structure_type,
  intervention_type,
  userId,
}) => {
  if (!name || !location || !userId) {
    throw new Error("Missing required fields");
  }

  const projectInstance = Project.create({
    name,
    location,
    surface_sqft,
    structure_type,
    intervention_type,
    userId,
  });

  const project = await prisma.project.create({
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

  return project;
};

export const getProjects = async () => {
  const projects = await prisma.project.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return projects;
};

export const getProjectById = async (id) => {
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!project) throw new Error("Project not found");

  return project;
};