import express from "express";
import cookieParser from "cookie-parser"; 
import setupMiddleware from "./src/middleware/index.js";
import apiRoutes from "./src/routes/index.js";
import authRoutes from "./src/routes/auth.routes.js";
import projectsRoutes from "./src/routes/project.routes.js"; //aca meti
import tradesRoutes from "./src/routes/trade.routes.js";
import taskRoutes from "./src/routes/task.routes.js";
import phaseRoutes from "./src/routes/phase.routes.js";
import technicalApprovalRoutes from "./src/routes/technicalApproval.routes.js";
import safetyMeasureRoutes from "./src/routes/safetyMeasure.routes.js";
import workerCoverageRoutes from "./src/routes/workerCoverage.routes.js";
import dailyLogRoutes from "./src/routes/dailyLog.routes.js";
import config from "./src/config/index.js";
import logger from "./src/utils/logger.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger.js";
import taskExecutionRoutes from "./src/routes/taskExecution.routes.js";

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
app.use("/api/trades", tradesRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/phases", phaseRoutes);
app.use("/api/technical-approvals", technicalApprovalRoutes);
app.use("/api/safety-measures", safetyMeasureRoutes);
app.use("/api/worker-coverages", workerCoverageRoutes);
app.use("/api/daily-logs", dailyLogRoutes);
app.use("/api/task-executions", taskExecutionRoutes);


// Levantar servidor
app.listen(config.port, () => {
  logger.info(`Server running on http://localhost:${config.port}`);
});