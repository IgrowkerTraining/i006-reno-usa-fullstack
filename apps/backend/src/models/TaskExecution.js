class TaskExecution {
  constructor({ id, taskId, dailyLogId }) {
    this.id = id;
    this.taskId = taskId;
    this.dailyLogId = dailyLogId;
  }

  toJSON() {
    return {
      id: this.id,
      taskId: this.taskId,
      dailyLogId: this.dailyLogId,
    };
  }

  static create(data) {
    if (!data.taskId || typeof data.taskId !== "string") {
      throw new Error("taskId is required and must be a string");
    }

    if (!data.dailyLogId || typeof data.dailyLogId !== "string") {
      throw new Error("dailyLogId is required and must be a string");
    }

    return new TaskExecution(data);
  }
}

export default TaskExecution;