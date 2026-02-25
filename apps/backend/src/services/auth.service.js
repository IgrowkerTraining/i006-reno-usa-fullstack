import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      username: email.split("@")[0],
      role, // "USER" o "PROFESSIONAL"
    },
  });

  const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, {
    expiresIn: "7d",
  });

  return { user, token };
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, {
    expiresIn: "7d",
  });

  return { user, token };
};