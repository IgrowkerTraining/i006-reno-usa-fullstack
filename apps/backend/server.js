import express from "express";
import cookieParser from "cookie-parser"; 
import setupMiddleware from "./src/middleware/index.js";
import apiRoutes from "./src/routes/index.js";
import authRoutes from "./src/routes/auth.routes.js";
import projectsRoutes from "./src/routes/project.routes.js"; //aca meti
import config from "./src/config/index.js";
import logger from "./src/utils/logger.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger.js";

const app = express();

// Middleware global
setupMiddleware(app);

// Middleware para parsear cookies
app.use(cookieParser());

// Rutas
app.use("/api", apiRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/projects",projectsRoutes); 

// Levantar servidor
app.listen(config.port, () => {
  logger.info(`Server running on http://localhost:${config.port}`);
});