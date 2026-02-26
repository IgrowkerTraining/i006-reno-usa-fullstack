import {
  createProject,
  getProjects,
  getProjectById,
} from "../services/project.service.js";

export const create = async (req, res) => {
  try {
    const {
      name,
      location,
      surface_sqft,
      structure_type,
      intervention_type,
      userId,
    } = req.body;

    const project = await createProject({
      name,
      location,
      surface_sqft,
      structure_type,
      intervention_type,
      userId,
    });

    res.status(201).json({
      message: "Project created",
      project,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const projects = await getProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getProjectById(id);

    res.json(project);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};