// src/services/auth.service.js
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

class UserService {

  async createUser({ name, email, password, role, trade }) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        username: email.split("@")[0],
        avatar: `https://picsum.photos/seed/${email}/200`,
        role: role || "USER",
        trade: trade || null,
      },
    });

    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }
}

const userService = new UserService();

// ✅ Wrappers que usa el controller
export const registerUser = async ({ name, email, password, role, trade }) => {
  const user = await userService.createUser({ name, email, password, role, trade });
  
  // generar token JWT aquí (ejemplo)
  const jwt = (await import("jsonwebtoken")).default;
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
  return { user, token };
};

export const loginUser = async (email, password) => {
  const user = await userService.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const jwt = (await import("jsonwebtoken")).default;
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

  const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
};