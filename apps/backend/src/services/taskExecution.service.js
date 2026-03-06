import prisma from "../lib/prisma.js";
import { mapTask } from "../mappers/task.mapper.js";

// ================= CREATE =================
export const createTaskExecution = async (data) => {
  try {
    const {
      taskId,
      dailyLogId,
      progressPercentage,
      taskName,
      taskDescription,
      phaseId,
      tradeId,
      userId,
    } = data;

    // Validaciones básicas
    if (!taskId && (!taskName || !phaseId || !tradeId)) {
      throw new Error(
        "taskId o los datos necesarios (taskName, phaseId, tradeId) son requeridos"
      );
    }
    if (!dailyLogId && (!userId || !phaseId)) {
      throw new Error("dailyLogId o userId y phaseId son requeridos");
    }
    if (
      progressPercentage !== undefined &&
      (progressPercentage < 0 || progressPercentage > 100)
    ) {
      throw new Error("progressPercentage debe estar entre 0 y 100");
    }

    // 1️⃣ Verificar o crear Task
    let task = null;
    if (taskId) {
      task = await prisma.task.findUnique({ where: { id: taskId } });
      if (!task) {
        // TaskId dado pero no existe, creamos una temporal
        task = await prisma.task.create({
          data: {
            name: taskName || "Tarea temporal",
            description: taskDescription || "",
            phaseId,
            tradeId,
          },
        });
      }
    } else {
      task = await prisma.task.create({
        data: {
          name: taskName,
          description: taskDescription || "",
          phaseId,
          tradeId,
        },
      });
    }

    // 2️⃣ Verificar o crear DailyLog
    let dailyLog = null;
    if (dailyLogId) {
      dailyLog = await prisma.dailyLog.findUnique({ where: { id: dailyLogId } });
      if (!dailyLog) {
        dailyLog = await prisma.dailyLog.create({
          data: {
            notes: "Registro temporal",
            userId,
            phaseId: task.phaseId,
          },
        });
      }
    } else {
      dailyLog = await prisma.dailyLog.create({
        data: {
          notes: "Registro temporal",
          userId,
          phaseId: task.phaseId,
        },
      });
    }

    // 3️⃣ Evitar duplicados
    const existing = await prisma.taskExecution.findFirst({
      where: { taskId: task.id, dailyLogId: dailyLog.id },
    });
    if (existing) {
      return {
        status: 200,
        message: "Task ya registrada en este DailyLog",
        taskExecution: existing,
      };
    }

    // 4️⃣ Crear TaskExecution
    const execution = await prisma.taskExecution.create({
      data: {
        taskId: task.id,
        dailyLogId: dailyLog.id,
        progressPercentage,
      },
      include: {
        task: {
          include: {
            executedTasks: {
              include: { dailyLog: { include: { user: true } } },
            },
          },
        },
        dailyLog: { include: { user: true } },
      },
    });

    // 5️⃣ Mapear task con record_history
    const mappedTask = mapTask(execution.task);

    return {
      status: 201,
      message: "TaskExecution creada correctamente",
      ...execution,
      task: mappedTask,
    };
  } catch (err) {
    // Capturamos cualquier error inesperado y devolvemos 400
    return {
      status: 400,
      message: err.message || "Error al crear TaskExecution",
    };
  }
};