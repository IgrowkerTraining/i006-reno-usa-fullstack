import { Project, ProjectInput } from '../types';

const API_URL = '/api/projects';

// --- SERVICIOS DE PROYECTOS ---
export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await fetch(API_URL, { credentials: 'include' });
    if (!response.ok) throw new Error('Error al obtener proyectos');
    return response.json();
  },

  getById: async (id: string): Promise<Project> => {
    const response = await fetch(`${API_URL}/${id}`, { credentials: 'include' });
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
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Error al eliminar proyecto');
    return response.json();
  },
};