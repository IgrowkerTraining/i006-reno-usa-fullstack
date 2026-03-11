import { ProjectHistoryItem, ProjectMetrics, ProjectPhase, ProjectTaskStatusUpdate } from '../types';
import { API_ENDPOINTS } from '../constants/routes';

const API_URL = `${API_ENDPOINTS.BASE}/api`;

// --- PROGRESS REPORT SERVICES ---
export const taskService = {

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

  updateTaskStatus: async (tasksIds: string[]) => {
    console.log(tasksIds);

    const response = await fetch(`${API_URL}/tasks/log-progress`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ tasksIds }),
    });
    if (!response.ok) throw new Error('Error to update the tasks status');
    return response.json();
  },
};