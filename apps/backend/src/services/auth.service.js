import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import userService from "./userService.js";

export const registerUser = async (data) => {

  const user = await userService.createUser(data);

  const token = jwt.sign(
    { id: user.id, role: user.role },
    config.jwtSecret,
    { expiresIn: "7d" }
  );

  return { user, token };
};

export const loginUser = async (email, password) => {

  const user = await userService.findByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const { password: _, ...safeUser } = user;

  const token = jwt.sign(
    { id: user.id, role: user.role },
    config.jwtSecret,
    { expiresIn: "7d" }
  );

  return { user: safeUser, token };
};