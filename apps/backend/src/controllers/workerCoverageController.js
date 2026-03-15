import {
  createWorkerCoverage,
  getWorkerCoverages,
  getWorkerCoverageById,
  updateWorkerCoverage,
  deleteWorkerCoverage,
} from "../services/workerCoverage.service.js";

export const create = async (req, res, next) => {
  try {
    const coverage = await createWorkerCoverage(req.body);
    res.status(201).json(coverage);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const dailyLogId = req.query.dailyLogId;
    const list = await getWorkerCoverages(dailyLogId);
    res.json(list);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const coverage = await getWorkerCoverageById(req.params.id);
    if (!coverage) return res.status(404).json({ message: "Coverage not found" });
    res.json(coverage);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const coverage = await updateWorkerCoverage(req.params.id, req.body);
    if (!coverage) return res.status(404).json({ message: "Coverage not found" });
    res.json(coverage);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await deleteWorkerCoverage(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Coverage not found" });
    res.json({ message: "Coverage deleted successfully" });
  } catch (error) {
    next(error);
  }
};
