// src/mappers/task.mapper.js
export const mapTask = (task) => {
  // Historial de ejecuciones de la tarea
  const record_history =
    task.executedTasks?.map((execution) => ({
      completed_at: execution.dailyLog?.log_date
        ? new Date(execution.dailyLog.log_date).toISOString()
        : execution.executedAt?.toISOString() || null,
      completed_by: execution.dailyLog?.user?.name || "Unknown",
      notes: execution.dailyLog?.notes || execution.notes || null,
      photo_url: execution.dailyLog?.photo_url || null,
      duration: execution.durationMinutes || null,
      additional_evidence: execution.additionalEvidence || null,
    })) || [];

  return {
    id: task.id,
    name: task.name,
    description: task.description || "",
    status:
      record_history.length > 0 &&
      record_history.every((r) => r.completed_at)
        ? "completed"
        : "pending",
    record_history,
  };
};