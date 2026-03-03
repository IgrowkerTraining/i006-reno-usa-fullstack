import {
  createDailyLog,
  getDailyLogs,
  getDailyLogById,
  updateDailyLog,
  deleteDailyLog,
} from "../services/dailyLog.service.js";

export const create = async (req, res, next) => {
  try {
    const log = await createDailyLog({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.phaseId) filter.phaseId = req.query.phaseId;
    if (req.query.userId) filter.userId = req.query.userId;
    const list = await getDailyLogs(filter);
    res.json(list);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const log = await getDailyLogById(req.params.id);
    if (!log) {
      return res.status(404).json({ message: "Daily log not found" });
    }
    res.json(log);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const log = await updateDailyLog(req.params.id, req.body);
    if (!log) {
      return res.status(404).json({ message: "Daily log not found" });
    }
    res.json(log);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await deleteDailyLog(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Daily log not found" });
    }
    res.json({ message: "Daily log deleted successfully" });
  } catch (error) {
    next(error);
  }
};
