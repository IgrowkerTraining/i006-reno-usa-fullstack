export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  HOME: '/',
} as const;

export const API_ENDPOINTS = {
  BASE: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
  },
  HEALTH: '/health',
} as const;

export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
} as const;
