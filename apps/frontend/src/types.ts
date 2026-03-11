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

// --- Fases del proyecto ---
export interface ProjectPhase {
  id: string;
  name: string;
  description?: string;
  planned_start: string; // ISO date
  planned_end: string;   // ISO date
  status: string;
  tasks: ProjectTask[];
}

// --- Tareas de cada fase ---
export interface ProjectTask {
  id: string;
  name: string;
  status: string;
  category: string;
  completedAt?: string;
  trade?: string;
}

// --- Métricas del proyecto ---
export interface ProjectMetrics {
  progress: number;           // porcentaje completado
  duration_days: number;      // duración estimada en días
  active_trades: string[];    // trades activos
}

// --- Historial de tareas completadas ---
export interface ProjectHistoryItem {
  taskId: string;
  taskName: string;
  completedAt: string;   // ISO date
  completedBy: string;  // nombre del usuario
  phase: string;        // nombre de la fase
}

export interface ProjectTaskStatusUpdate {
  tasksId: string[]; //debe de ser un array de string
}