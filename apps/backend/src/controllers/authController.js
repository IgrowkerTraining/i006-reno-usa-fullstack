import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { user, token } = await registerUser({ name, email, password, role });

    res
      .cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" })
      .status(201)
      .json({ message: "User created", user: { id: user.id, name: user.name, email: user.email, username: user.username, role: user.role }, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);

    res
      .cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" })
      .json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email, username: user.username, role: user.role }, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};