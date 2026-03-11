import { registerUser, loginUser } from "../services/auth.service.js";
import userService from "../services/userService.js";
import Validator from "../utils/validator.js";

/* =========================
   GET CURRENT USER
========================= */
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password: _, ...safeUser } = user;
    return res.status(200).json({
      message: "Current user fetched",
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* =========================
   REGISTER
========================= */
export const register = async (req, res) => {
  try {
    const errors = Validator.validateRegistration(req.body);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { name, email, password, role, trade, avatar } = req.body;

    const { user, token } = await registerUser({
      name,
      email,
      password,
      role,
      trade: trade || null,
      avatar,
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // true en producción
        sameSite: "lax",
      })
      .status(201)
      .json({
        message: "User created",
        user, // 👈 devuelve safeUser con trade
        token,
      });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/* =========================
   LOGIN
========================= */
export const login = async (req, res) => {
  try {
    const errors = Validator.validateLogin(req.body);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // cambiar a true en producción
        sameSite: "none",
      })
      .json({
        message: "Login successful",
        user, // 👈 devuelve safeUser con trade
        token,
      });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};