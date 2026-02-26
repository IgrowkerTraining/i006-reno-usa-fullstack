import { registerUser, loginUser } from "../services/auth.service.js";
import Validator from "../utils/validator.js";

/* =========================
   REGISTER
========================= */
export const register = async (req, res) => {
  try {
    const errors = Validator.validateRegistration(req.body);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { name, email, password, role } = req.body;

    const { user, token } = await registerUser({
      name,
      email,
      password,
      role,
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // cambiar a true en producción
        sameSite: "lax",
      })
      .status(201)
      .json({
        message: "User created",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        token,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
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

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // cambiar a true en producción
        sameSite: "lax",
      })
      .json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        token,
      });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};