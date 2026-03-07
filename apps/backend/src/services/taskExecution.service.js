import prisma from "../lib/prisma.js";
import { mapTask } from "../mappers/task.mapper.js";

export const createTaskExecution = async (data) => {
  try {
    console.log("=== createTaskExecution ===");
    console.log("Body recibido:", data);

    const {
      taskId,
      dailyLogId,
      progressPercentage = 0,
      taskName,
      taskDescription,
      tradeId,
      userId,
      phaseId,
    } = data;

    // Validaciones
    console.log("Validando datos...");
    if (!taskId && (!taskName || !tradeId || !phaseId)) {
      throw new Error("taskId o los datos necesarios (taskName, tradeId, phaseId) son requeridos");
    }
    if (!dailyLogId && !userId) {
      throw new Error("dailyLogId o userId son requeridos");
    }
    if (progressPercentage < 0 || progressPercentage > 100) {
      throw new Error("progressPercentage debe estar entre 0 y 100");
    }
    console.log("Validación pasada ✅");

    // 1️⃣ Obtener o crear Task
    console.log("Buscando Task...");
    let task = taskId
      ? await prisma.task.findUnique({ where: { id: taskId } })
      : null;

    console.log("Task encontrada:", task);

    if (!task) {
      console.log("Task no encontrada, creando nueva...");
      task = await prisma.task.create({
        data: {
          name: taskName,
          description: taskDescription || "",
          phaseId,
          tradeId,
        },
      });
      console.log("Task creada:", task);
    }

    // 2️⃣ Obtener o crear DailyLog
    console.log("Buscando DailyLog...");
    let dailyLog = dailyLogId
      ? await prisma.dailyLog.findUnique({ where: { id: dailyLogId } })
      : null;

    console.log("DailyLog encontrada:", dailyLog);

    if (!dailyLog) {
      console.log("DailyLog no encontrada, creando nueva...");
      dailyLog = await prisma.dailyLog.create({
        data: {
          notes: "Registro temporal",
          userId,
          phaseId: task.phaseId,
          log_date: new Date(),
          completion_percentage: progressPercentage,
          schedule_deviation: 0,
        },
      });
      console.log("DailyLog creada:", dailyLog);
    }

    // 3️⃣ Evitar duplicados
    console.log("Verificando duplicados...");
    const existing = await prisma.taskExecution.findFirst({
      where: { taskId: task.id, dailyLogId: dailyLog.id },
      include: {
        task: {
          include: {
            executedTasks: {
              include: { dailyLog: { include: { user: true } } },
            },
          },
        },
      },
    });
    console.log("TaskExecution existente:", existing);

    if (existing) {
      console.log("Duplicado encontrado, retornando...");
      return {
        status: 200,
        message: "Task ya registrada en este DailyLog",
        taskExecution: existing,
        task: mapTask(existing.task),
      };
    }

    // 4️⃣ Crear TaskExecution
    console.log("Creando nueva TaskExecution...");
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
    console.log("TaskExecution creada:", execution);

    // 5️⃣ Mapear task con record_history
    const mappedTask = mapTask(execution.task);
    console.log("Task mapeada:", mappedTask);

    return {
      status: 201,
      message: "TaskExecution creada correctamente",
      taskExecution: execution,
      task: mappedTask,
    };
  } catch (err) {
    console.error("❌ ERROR EN createTaskExecution:", err);
    return {
      status: 400,
      message: err.message || "Error al crear TaskExecution",
    };
  }
};