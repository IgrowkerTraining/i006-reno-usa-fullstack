import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

class UserService {

  async createUser({ name, email, password, role, trade }) {
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
        username: email.split("@")[0],
        avatar: `https://picsum.photos/seed/${email}/200`,
        role: role || "USER",
        trade, // 🔹 se guarda correctamente
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

export default new UserService();


export const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      role: true,
      trade: true,
      avatar: true
    }
  });

  return users;
};