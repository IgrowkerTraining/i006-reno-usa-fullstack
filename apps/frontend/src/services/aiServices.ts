import { API_ENDPOINTS } from '../constants/routes';

const AI_API_URL = `${API_ENDPOINTS.BASE}/api/ai`;

export const aiService = {
    analyzeProject: async (projectId: string) => {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${AI_API_URL}/analyze/${projectId}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
        });

        if (!response.ok) throw new Error("Error generating AI analysis");

        return response.json();
    }
}