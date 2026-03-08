import prisma from '../lib/prisma.js';

const AI_BACKEND_URL = process.env.AI_BACKEND_URL || "http://host.docker.internal:8000/api/v1";

export const generateAndSaveReport = async (projectId) => {
  // 1. Buscamos el proyecto con toda su estructura anidada
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      assignedProfessional: true,
      phases: {
        include: {
          tasks: true // Traemos las tareas para calcular avances
        }
      }
    }
  });

  if (!project) {
    throw new Error("Proyecto no encontrado en la base de datos.");
  }

// Lógica para detectar la fase actual
  const currentPhase = project.phases.find(p => p.status === 'in_progress') 
                    || project.phases.find(p => p.status === 'pending') 
                    || project.phases[0];

  const totalTasks = currentPhase ? currentPhase.tasks.length : 0;
  const completedTasks = currentPhase ? currentPhase.tasks.filter(t => t.status === 'completed') : [];
  const inProgressTasks = currentPhase ? currentPhase.tasks.filter(t => t.status === 'in_progress') : [];
  
  const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks.length / totalTasks) * 100);

  // Armamos el DTO con la lista COMPLETA de tareas y sus estados
  const snapshotDTO = {
    project_code: project.code,
    project_name: project.name,
    current_phase: currentPhase ? currentPhase.name : "N/A",
    phase_progress_percentage: percentage,
    total_tasks_count: totalTasks,
    // Mandamos las tareas activas para el recuadro "In Process"
    in_process_tasks: inProgressTasks.map(t => t.name),
    // Mandamos el historial secuencial para que la IA detecte incidencias
    tasks_sequence: currentPhase ? currentPhase.tasks.map((t, index) => ({
      sequence_number: index + 1,
      name: t.name,
      status: t.status
    })) : []
  };

  // 5. Llamada al Microservicio de IA (Python)
  const response = await fetch(`${AI_BACKEND_URL}/reportes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ snapshot: snapshotDTO }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error del servicio de IA: ${JSON.stringify(errorData)}`);
  }

  const aiData = await response.json();

  // 6. Persistencia del reporte en la base de datos local
  const newSnapshot = await prisma.projectSnapshot.create({
    data: {
      projectId: projectId,
      period_label: `Análisis de Fase: ${snapshotDTO.current_phase}`,
      aiReports: {
        create: {
          summary: JSON.stringify(aiData.analisis) // Asumiendo que Python devuelve { "analisis": "texto..." }
        }
      }
    },
    include: { aiReports: true }
  });

  return newSnapshot;
};