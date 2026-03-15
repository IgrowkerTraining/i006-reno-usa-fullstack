import prisma from "../lib/prisma.js";

export const createTrade = async (data) => {
  return await prisma.trade.create({
    data: {
      name: data.name,
      description: data.description,
    },
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
  return await prisma.trade.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
    },
  });
};

export const deleteTrade = async (id) => {
  return await prisma.trade.delete({
    where: { id },
  });
};