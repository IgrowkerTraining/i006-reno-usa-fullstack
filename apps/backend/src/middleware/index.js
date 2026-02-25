import cors from "cors";
import express from "express";
import pinoHttp from "pino-http";
import logger from "../utils/logger.js";

const setupMiddleware = (app) => {
  app.use(cors());

  app.use(
    pinoHttp({
      logger,
    })
  );

  app.use(express.json());
};

export default setupMiddleware;