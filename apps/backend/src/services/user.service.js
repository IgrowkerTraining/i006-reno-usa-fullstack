import prisma from "../lib/prisma.js";

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        avatar: true,
        role: true,
        trade: true,
      },
    });
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};
