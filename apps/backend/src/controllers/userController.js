import { getUsers } from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();

    res.json({
      count: users.length,
      users
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};