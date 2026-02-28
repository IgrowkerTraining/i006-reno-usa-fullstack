import cors from "cors";
import express from "express";
import pinoHttp from "pino-http";
import logger from "../utils/logger.js";

const setupMiddleware = (app) => {
  const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
  app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

  app.use(
    pinoHttp({
      logger,
    })
  );

  app.use(express.json());
};

export default setupMiddleware;