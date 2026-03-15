export const mapTask = (task) => {
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
    status: task.status || "pending", 
    record_history,
  };
};