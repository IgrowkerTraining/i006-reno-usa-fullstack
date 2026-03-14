import prisma from '../lib/prisma.js';

const AI_BACKEND_URL = process.env.AI_BACKEND_URL || "https://refactored-trout-ww5g9x4xp6jfpjr-8000.app.github.dev";

export const getAiProjectAnalysis = async (projectId) => {
  // 1. Buscamos el proyecto con todas sus fases ordenadas y tareas
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      phases: {
        orderBy: { planned_start: 'asc' }, // Orden cronológico
        include: {
          tasks: {
            select: { 
              name: true, 
              status: true, 
              is_incidence: true, 
              category: true 
            }
          }
        }
      }
    }
  });

  if (!project) {
    throw new Error("Proyecto no encontrado en la base de datos.");
  }

  // 2. Detectamos la fase activa
  const currentPhase = project.phases.find(phase => 
    phase.tasks.some(task => task.status !== 'completed')
  );
  const activePhaseName = currentPhase ? currentPhase.name : "Proyecto Finalizado";

  // 3. Aplanamos la lista de tareas
  const allTasksClean = [];
  project.phases.forEach(phase => {
    phase.tasks.forEach(task => {
      allTasksClean.push({
        name: task.name,
        phase: phase.name,
        status: task.status,
        is_incidence: task.is_incidence,
        category: task.category
      });
    });
  });

  // 4. Armamos el DTO (El "Snapshot" crudo)
  const snapshotDTO = {
    project_id: project.id,
    project_name: project.name,
    active_phase: activePhaseName,
    tasks_snapshot: allTasksClean
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

  // Obtenemos la respuesta
  const aiData = await response.json();

  // 6. Retornamos la respuesta directo al Frontend 
  return aiData.analisis; 
};