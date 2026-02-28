import cors from "cors";
import express from "express";
import pinoHttp from "pino-http";
import logger from "../utils/logger.js";

const setupMiddleware = (app) => {
  app.use(cors({
  origin: 'http://localhost:5173',
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