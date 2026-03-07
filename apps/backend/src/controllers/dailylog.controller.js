import {
  createDailyLog,
  getDailyLogs,
  getDailyLogById,
  deleteDailyLog,
} from "../services/dailylog.service.js";

export const create = async (req, res, next) => {
  try {
    const dailyLog = await createDailyLog(req.body);
    res.status(201).json({
      status: "success",
      payload: dailyLog,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const logs = await getDailyLogs();
    res.json({
      status: "success",
      payload: logs,
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const log = await getDailyLogById(req.params.id);
    res.json({
      status: "success",
      payload: log,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const log = await deleteDailyLog(req.params.id);
    res.json({
      status: "success",
      payload: log,
    });
  } catch (error) {
    next(error);
  }
};