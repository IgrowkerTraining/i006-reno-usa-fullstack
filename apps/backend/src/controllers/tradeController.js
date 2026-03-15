import {
  createTrade,
  getTrades,
  getTradeById,
  updateTrade,
  deleteTrade,
} from "../services/trade.service.js";

// CREATE TRADE
export const create = async (req, res, next) => {
  try {
    const trade = await createTrade(req.body);
    return res.status(201).json(trade);
  } catch (error) {
    next(error);
  }
};

// GET ALL TRADES
export const getAll = async (req, res, next) => {
  try {
    const trades = await getTrades();
    return res.status(200).json(trades);
  } catch (error) {
    next(error);
  }
};

// GET TRADE BY ID
export const getOne = async (req, res, next) => {
  try {
    const trade = await getTradeById(req.params.id);

    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }

    return res.status(200).json(trade);
  } catch (error) {
    next(error);
  }
};

// UPDATE TRADE
export const update = async (req, res, next) => {
  try {
    const trade = await updateTrade(req.params.id, req.body);

    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }

    return res.status(200).json(trade);
  } catch (error) {
    next(error);
  }
};

// DELETE TRADE
export const remove = async (req, res, next) => {
  try {
    const deleted = await deleteTrade(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Trade not found" });
    }

    return res.status(200).json({
      message: "Trade deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};