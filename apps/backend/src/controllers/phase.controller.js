import {
  createPhase,
  getPhases,
  getPhaseById,
  deletePhase,
} from "../services/phase.service.js";

export const create = async (req, res, next) => {
  try {
    const phase = await createPhase(req.body);
    res.status(201).json(phase);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const phases = await getPhases();
    res.json(phases);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const phase = await getPhaseById(req.params.id);
    if (!phase) return res.status(404).json({ message: "Phase not found" });

    res.json(phase);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await deletePhase(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Phase not found" });

    res.json({ message: "Phase deleted successfully" });
  } catch (error) {
    next(error);
  }
};