import express from "express";
import cookieParser from "cookie-parser"; 
import setupMiddleware from "./src/middleware/index.js";
import apiRoutes from "./src/routes/index.js";
import config from "./src/config/index.js";
import logger from "./src/utils/logger.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger.js";

const app = express();

// Middleware global
setupMiddleware(app);

// Middleware para parsear JSON
app.use(express.json()); 

// Middleware para parsear cookies
app.use(cookieParser());

// Rutas principales
app.use("/api", apiRoutes);

// Swagger UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Levantar servidor
app.listen(config.port, () => {
  logger.info(`Server running on http://localhost:${config.port}`);
});