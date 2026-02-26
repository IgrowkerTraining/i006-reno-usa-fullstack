import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

class UserService {
  async create({ name, email, password, username, role }) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        username,
        role: role || "user",
      },
    });

    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async authenticate(email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  async findById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    const { password: _, ...safeUser } = user;
    return safeUser;
  }
}

export default new UserService();