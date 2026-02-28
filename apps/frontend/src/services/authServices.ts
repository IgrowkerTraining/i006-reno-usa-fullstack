import { User } from "../types";
import { API_ENDPOINTS } from "../constants/routes";
import { storage } from "../utils/storage";

export const api = {
  async register(data: any): Promise<{ user: User; token?: string; message: string }> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.REGISTER}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Registration failed");
    }

    storage.setUser(result.user);
    if (result.token) storage.setToken(result.token);

    return result;
  },

  async login(data: any): Promise<{ user: User; token?: string; message: string }> {
    const response = await fetch(
      `${API_ENDPOINTS.BASE}${API_ENDPOINTS.AUTH.LOGIN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Login failed");
    }

    storage.setUser(result.user);
    if (result.token) storage.setToken(result.token);

    return result;
  },

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_ENDPOINTS.BASE}${API_ENDPOINTS.HEALTH}`);
      return response.ok;
    } catch {
      return false;
    }
  },
};