import {
  createTrade,
  getTrades,
  getTradeById,
  updateTrade,
  deleteTrade,
} from "../services/trade.service.js";

export const create = async (req, res, next) => {
  try {
    const trade = await createTrade(req.body);
    res.status(201).json(trade);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const trades = await getTrades();
    res.json(trades);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const trade = await getTradeById(req.params.id);
    if (!trade) return res.status(404).json({ message: "Trade not found" });
    res.json(trade);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const trade = await updateTrade(req.params.id, req.body);
    if (!trade) return res.status(404).json({ message: "Trade not found" });
    res.json(trade);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const deleted = await deleteTrade(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Trade not found" });
    res.json({ message: "Trade deleted successfully" });
  } catch (error) {
    next(error);
  }
};
