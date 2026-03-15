import prisma from '../lib/prisma.js';

const AI_BACKEND_URL = process.env.AI_BACKEND_URL || "http://host.docker.internal:8000/api/v1";

export const getAiProjectAnalysis = async (projectId) => {
  // 1. Buscamos el proyecto con todas sus fases ordenadas y tareas
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      phases: {
        orderBy: { planned_start: 'asc' },
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
  const response = await fetch(`${AI_BACKEND_URL}/reportes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ snapshot: snapshotDTO }),
  });

  // Cambio 2: Manejo de errores a prueba de balas
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error del servicio de IA (Código ${response.status}): ${errorText.substring(0, 150)}...`);
  }

  const aiData = await response.json();

  // 6. Retornamos la respuesta directo al Frontend 
  return aiData.analisis; 
};