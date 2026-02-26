import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../services/project.service.js";

/**
 * Proyecto creado
 */
export const create = async (req, res, next) => {
  try {
    const project = await createProject({
      ...req.body,
      userId: req.user.id, 
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

/**
 * Traer todos los proyectos del usuario logueado
 */
export const getAll = async (req, res, next) => {
  try {
    const projects = await getProjects(req.user.id);
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

/**
 * Traer unico proyecto (solo para el que esta logueado)
 */
export const getOne = async (req, res, next) => {
  try {
    const project = await getProjectById(
      req.params.id,
      req.user.id
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

/**
 * Proyecto actualizado (solo para el que esta logueado)
 */
export const update = async (req, res, next) => {
  try {
    const project = await updateProject(
      req.params.id,
      req.user.id,
      req.body
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

/**
 * Proyecto eliminado (solo para el que esta logueado)
 */
export const remove = async (req, res, next) => {
  try {
    const deleted = await deleteProject(
      req.params.id,
      req.user.id
    );

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};