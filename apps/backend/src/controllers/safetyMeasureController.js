import {
  createSafetyMeasure,
  getSafetyMeasures,
  getSafetyMeasureById,
  updateSafetyMeasure,
  deleteSafetyMeasure,
} from "../services/safetyMeasure.service.js";

export const create = async (req, res, next) => {
  try {
    const measure = await createSafetyMeasure(req.body);
    res.status(201).json(measure);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const dailyLogId = req.query.dailyLogId;
    const measures = await getSafetyMeasures(dailyLogId);
    res.json(measures);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const measure = await getSafetyMeasureById(req.params.id);
    if (!measure) return res.status(404).json({ message: "Measure not found" });
    res.json(measure);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const measure = await updateSafetyMeasure(req.params.id, req.body);
    if (!measure) return res.status(404).json({ message: "Measure not found" });
    res.json(measure);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await deleteSafetyMeasure(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Measure not found" });
    res.json({ message: "Measure deleted successfully" });
  } catch (error) {
    next(error);
  }
};
