export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  HOME: '/',
} as const;

export const API_ENDPOINTS = {
  BASE: 'https://vigilant-meme-q7x5wvrwjpv5cx9jg-3000.app.github.dev/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  HEALTH: '/health',
} as const;

export const STORAGE_KEYS = {
  USER: 'example_user',
  TOKEN: 'example_token',
} as const;
