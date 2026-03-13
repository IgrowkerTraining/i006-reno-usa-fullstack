import {
  createTask,
  getTasks,
  getTaskById,
  deleteTask,
} from "../services/task.service.js";

import prisma from '../lib/prisma.js';

export const logProgress = async (req, res) => {
  try {
    const { taskIds } = req.body; 

    const userId = req.user.id; 

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
      return res.status(400).json({ message: "Se requiere un array válido de taskIds" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true }
    });
    const userName = user ? user.name : "Usuario Desconocido";

    const tasksToUpdate = await prisma.task.findMany({
      where: { id: { in: taskIds } },
      select: { phaseId: true }
    });

    if (tasksToUpdate.length === 0) {
      return res.status(404).json({ message: "No se encontraron las tareas especificadas" });
    }

    const uniquePhaseIds = [...new Set(tasksToUpdate.map(t => t.phaseId))];

    await prisma.task.updateMany({
      where: { id: { in: taskIds } },
      data: {
        status: 'completed',
        is_incidence: false,
        completedAt: new Date(),
        completedBy: userName 
      }
    });

    for (const phaseId of uniquePhaseIds) {
      // 1. Lógica de Incidencias 
      const maxCompletedTask = await prisma.task.findFirst({
        where: { phaseId: phaseId, status: 'completed' },
        orderBy: { order: 'desc' }
      });

      if (maxCompletedTask) {
        const maxOrder = maxCompletedTask.order;
        await prisma.task.updateMany({
          where: {
            phaseId: phaseId,
            order: { lt: maxOrder }, 
            status: { not: 'completed' }
          },
          data: { is_incidence: true }
        });
      }

      // --- 2. CHECK DE CIERRE DE FASE ---
      const pendingTasksInPhase = await prisma.task.count({
        where: {
          phaseId: phaseId,
          status: { not: 'completed' } 
        }
      });

      if (pendingTasksInPhase === 0) {
        await prisma.phase.update({
          where: { id: phaseId },
          data: { status: 'completed' }
        });
        console.log(`✨ [AUTO-FINISH] Fase ${phaseId} completada al 100%.`);
      }
    }

    res.status(200).json({
      message: "Progreso guardado e incidencias calculadas correctamente",
      updatedTasksCount: taskIds.length
    });

  } catch (error) {
    console.error("🚨 Error en logProgress:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// OBTENER TAREAS PENDIENTES (POR OFICIO)

export const getMyPendingTasks = async (req, res) => {
  try {
    // 1. Agarramos el ID del usuario logueado 
    const userId = req.user.id; 
    
    // El frontend nos debería mandar de qué proyecto quiere ver las tareas
    const { projectId } = req.query;

    if (!projectId) {
      return res.status(400).json({ message: "Se requiere el projectId por query (?projectId=...)" });
    }

    // 2. Buscamos el oficio exacto del usuario en la base de datos
    const user = await prisma.user.findUnique({ 
      where: { id: userId },
      select: { trade: true }
    });

    if (!user || !user.trade) {
      return res.status(403).json({ 
        message: "No tenés un oficio (trade) asignado para ver estas tareas específicas." 
      });
    }

    // --- 3. BUSCAMOS LA FASE ACTIVA POR SU PROPIO ESTADO ---
const activePhase = await prisma.phase.findFirst({
  where: {
    projectId: projectId,
    status: { not: 'completed' } // Buscamos la primera que no esté cerrada
  },
  orderBy: { planned_start: 'asc' } // Respetamos el orden cronológico
});

    // Si no encontramos una fase activa, significa que todo el proyecto está terminado
    if (!activePhase) {
      return res.status(200).json({
        message: "El proyecto no tiene fases activas o ya está 100% completado.",
        count: 0,
        data: []
      });
    }

    // --- 4. BUSCAMOS TAREAS SOLO DE ESA FASE ---
    const tasks = await prisma.task.findMany({
      where: {
        status: { in: ['pending', 'in_progress'] },
        phaseId: activePhase.id, 
        trade: {
          name: {
              equals: user.trade,
              mode: 'insensitive' 
          }
        }
      },
      include: {
        phase: {
          select: { name: true } 
        }
      },
      // Como ahora solo traemos tareas de UNA fase, nos alcanza con ordenar por el campo 'order'
      orderBy: { order: 'asc' } 
    });

    res.status(200).json({
      message: `Tareas pendientes para el oficio: ${user.trade} (Fase actual: ${activePhase.name})`,
      count: tasks.length,
      data: tasks
    });

  } catch (error) {
    console.error("🚨 Error en getMyPendingTasks:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res, next) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json({
      status: "success",
      payload: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const tasks = await getTasks();
    res.json({
      status: "success",
      payload: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);
    res.json({
      status: "success",
      payload: task,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const task = await deleteTask(req.params.id);
    res.json({
      status: "success",
      payload: task,
    });
  } catch (error) {
    next(error);
  }
};