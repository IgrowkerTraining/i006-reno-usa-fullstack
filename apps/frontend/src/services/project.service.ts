import { Project, ProjectHistoryItem, ProjectInput, ProjectMetrics, ProjectPhase, ProjectTaskStatusUpdate } from '../types';
import { API_ENDPOINTS } from '../constants/routes';

const API_URL = `${API_ENDPOINTS.BASE}/api/projects`;

// --- SERVICIOS DE PROYECTOS ---
export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Error al obtener proyectos');
    return response.json();
  },

  getById: async (id: string): Promise<Project> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Error al obtener el proyecto');
    return response.json();
  },

  create: async (data: ProjectInput): Promise<Project> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear proyecto');
    return response.json();
  },

  update: async (id: string, data: Partial<ProjectInput>): Promise<Project> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al actualizar proyecto');
    return response.json();
  },

  remove: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Error al eliminar proyecto');
    return response.json();
  },

  // --- REGISTRO DE AVANCE ---
  getMetrics: async (id: string): Promise<ProjectMetrics> => {
    const response = await fetch(`${API_URL}/${id}/metrics`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Error to obtain the project metrics');
    return response.json();
  },

  getPhases: async (id: string): Promise<ProjectPhase[]> => {
    const response = await fetch(`${API_URL}/${id}/phases`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Error to obtain the project phases');
    return response.json();
  },

  getHistory: async (id: string): Promise<ProjectHistoryItem[]> => {
    const response = await fetch(`${API_URL}/${id}/history`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Error to obtain the tasks history');
    return response.json();
  },

  updateTaskStatus: async (tasksId: string[]) => {
    const response = await fetch(`${API_URL}/tasks/log-progress`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ tasksId }),
    });
    if (!response.ok) throw new Error('Error to update the tasks status');
    return response.json();
  },
};