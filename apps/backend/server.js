import express from "express";
import cookieParser from "cookie-parser"; 
import setupMiddleware from "./src/middleware/index.js";
import apiRoutes from "./src/routes/index.js";
import authRoutes from "./src/routes/auth.routes.js";
import config from "./src/config/index.js";
import logger from "./src/utils/logger.js";

const app = express();

// Middleware global
setupMiddleware(app);

// Middleware para parsear cookies
app.use(cookieParser());

// Rutas
app.use("/api", apiRoutes);
app.use("/auth", authRoutes); 

// Levantar servidor
app.listen(config.port, () => {
  logger.info(`Server running on http://localhost:${config.port}`);
});