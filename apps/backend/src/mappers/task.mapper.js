export const mapTask = (task) => {
  // Historial de ejecuciones de la tarea
  const record_history =
  task.executedTasks?.map((execution) => ({
    completed_at: execution.executedAt?.toISOString(),
    completed_by: execution.dailyLog?.user?.name || null,
    notes: execution.notes || null,
    photo_url: execution.photoUrl || null,          
    duration: execution.durationMinutes || null,    
    additional_evidence: execution.additionalEvidence || null, 
  })) || [];

  return {
    id: task.id,
    name: task.name,
    description: task.description,
    status: record_history.length > 0 ? "completed" : "pending",
    record_history,
  };
};