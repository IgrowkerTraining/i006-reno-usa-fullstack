export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export enum AuthView {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  DASHBOARD = "DASHBOARD",
}

export interface Project {
  id: string;
  code: string;
  name: string;
  location: string;
  surface_sqft: number;
  structure_type: string;
  intervention_type: string;
  userId: string;
}

export interface ProjectInput {
  name: string;
  location: string;
  surface_sqft: number;
  structure_type: string;
  intervention_type: string;
}
