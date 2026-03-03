import prisma from "../lib/prisma.js";
import Trade from "../models/Trade.js";

export const createTrade = async (data) => {
  const { name, description } = data;
  if (!name) {
    throw new Error("Missing required field: name");
  }

  const tradeInstance = Trade.create(data);
  return await prisma.trade.create({
    data: tradeInstance.toJSON(),
  });
};

export const getTrades = async () => {
  return await prisma.trade.findMany();
};

export const getTradeById = async (id) => {
  return await prisma.trade.findUnique({
    where: { id },
  });
};

export const updateTrade = async (id, data) => {
  const existing = await prisma.trade.findUnique({ where: { id } });
  if (!existing) return null;

  return await prisma.trade.update({
    where: { id },
    data,
  });
};

export const deleteTrade = async (id) => {
  const existing = await prisma.trade.findUnique({ where: { id } });
  if (!existing) return null;

  return await prisma.trade.delete({ where: { id } });
};
