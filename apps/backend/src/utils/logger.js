import pino from "pino";
import config from "../config/index.js";

const logger = pino({
  level: config.nodeEnv === "development" ? "debug" : "info",
  transport:
    config.nodeEnv === "development"
      ? {
          target: "pino-pretty",
          options: { colorize: true },
        }
      : undefined,
});

export default logger;