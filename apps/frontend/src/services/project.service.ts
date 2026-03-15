import { Project, ProjectHistoryItem, ProjectInput, ProjectMetrics, ProjectPhase, ProjectTaskStatusUpdate } from '../types';
import { API_ENDPOINTS } from '../constants/routes';

const API_URL = `${API_ENDPOINTS.BASE}/api/projects`;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

// --- SERVICIOS DE PROYECTOS ---
export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Error al obtener proyectos');
    const data = await response.json();
    return data.data || data;
  },

  getById: async (id: string): Promise<Project> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Error al obtener el proyecto');
    const data = await response.json();
    return data.data || data;
  },

  create: async (data: ProjectInput): Promise<Project> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear proyecto');
    const result = await response.json();
    return result.data || result;
  },

  update: async (id: string, data: Partial<ProjectInput>): Promise<Project> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al actualizar proyecto');
    const result = await response.json();
    return result.data || result;
  },

  remove: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Error al eliminar proyecto');
    return response.json();
  },

  // --- REGISTRO DE AVANCE ---
  getMetrics: async (id: string): Promise<ProjectMetrics> => {
    const response = await fetch(`${API_URL}/${id}/metrics`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Error to obtain the project metrics');
    const result = await response.json();
    return result.data || result;
  },

  getPhases: async (id: string): Promise<ProjectPhase[]> => {
    const response = await fetch(`${API_URL}/${id}/phases`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Error to obtain the project phases');
    const result = await response.json();
    return result.data || result;
  },

  getHistory: async (id: string): Promise<ProjectHistoryItem[]> => {
    const response = await fetch(`${API_URL}/${id}/history`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Error to obtain the tasks history');
    const result = await response.json();
    return result.data || result;
  },

  getMyPendingTasks: async (projectId: string) => {
    const response = await fetch(`${API_ENDPOINTS.BASE}/api/tasks/my-pending-tasks?projectId=${projectId}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) throw new Error('Error obtaining pending tasks');

    const result = await response.json();
    return result.data || result;
  },

  updateTaskStatus: async (data: { taskIds: string[] }) => {
    const response = await fetch(`${API_ENDPOINTS.BASE}/api/tasks/log-progress`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Error to update the tasks status");
    const result = await response.json();
    return result.data || result;
  },
};