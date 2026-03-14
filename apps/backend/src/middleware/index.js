import cors from "cors";
import express from "express";
import pinoHttp from "pino-http";
import logger from "../utils/logger.js";

const setupMiddleware = (app) => {
  // 1. Armamos una lista con todos los links que tienen permiso de entrar
  const allowedOrigins = [
    "http://localhost:5173", // Para que siga funcionando en la compu local
    "https://reno-usa-fullstack.vercel.app", // ¡Tu link de Vercel!
    process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : null
  ].filter(Boolean); // Esto limpia los links vacíos por las dudas

  // 2. Le pasamos la lista a CORS
  app.use(cors({
    origin: allowedOrigins,
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