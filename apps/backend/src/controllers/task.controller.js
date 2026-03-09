import {
  createTask,
  getTasks,
  getTaskById,
  deleteTask,
} from "../services/task.service.js";

import prisma from '../lib/prisma.js';

export const logProgress = async (req, res) => {
  try {
    // El frontend nos manda un array con los IDs de las tareas tildadas
    const { taskIds } = req.body; 

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
      return res.status(400).json({ message: "Se requiere un array válido de taskIds" });
    }

    // 1. Averiguar de qué fase(s) son estas tareas 
    // (Por si el obrero tildó tareas de distintas fases al mismo tiempo)
    const tasksToUpdate = await prisma.task.findMany({
      where: { id: { in: taskIds } },
      select: { phaseId: true }
    });

    if (tasksToUpdate.length === 0) {
      return res.status(404).json({ message: "No se encontraron las tareas especificadas" });
    }

    // Sacamos los IDs únicos de las fases afectadas
    const uniquePhaseIds = [...new Set(tasksToUpdate.map(t => t.phaseId))];

    // 2. Actualizar las tareas tildadas a "completed" y apagarles la alarma por si la tenían
    await prisma.task.updateMany({
      where: { id: { in: taskIds } },
      data: {
        status: 'completed',
        is_incidence: false, // Si la completaron, ya no es incidencia
        completedAt: new Date()
      }
    });

    for (const phaseId of uniquePhaseIds) {
      
      // Buscamos cuál es la tarea completada con el ORDEN MÁS ALTO en esta fase
      const maxCompletedTask = await prisma.task.findFirst({
        where: { phaseId: phaseId, status: 'completed' },
        orderBy: { order: 'desc' }
      });

      if (maxCompletedTask) {
        const maxOrder = maxCompletedTask.order;

        // A todas las tareas con un orden MENOR que sigan pendientes, les prendemos la alarma
        await prisma.task.updateMany({
          where: {
            phaseId: phaseId,
            order: { lt: maxOrder }, 
            status: { not: 'completed' }
          },
          data: {
            is_incidence: true
          }
        });
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

    // --- 3. NUEVO: BUSCAMOS LA FASE ACTIVA DEL PROYECTO ---
    // (La primera fase cronológica que tenga al menos una tarea sin terminar)
    const activePhase = await prisma.phase.findFirst({
      where: {
        projectId: projectId,
        tasks: {
          some: { status: { not: 'completed' } }
        }
      },
      orderBy: { planned_start: 'asc' }
    });

    // Si no encontramos una fase activa, significa que todo el proyecto está terminado
    if (!activePhase) {
      return res.status(200).json({
        message: "El proyecto no tiene fases activas o ya está 100% completado.",
        count: 0,
        data: []
      });
    }

    // --- 4. MODIFICADO: BUSCAMOS TAREAS SOLO DE ESA FASE ---
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