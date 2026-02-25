import jwt from "jsonwebtoken";
import config from "../config/index.js";

const generateToken = (payload) => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

export default {
  generateToken,
  verifyToken,
};