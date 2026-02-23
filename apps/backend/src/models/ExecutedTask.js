class ExecutedTask {
    constructor({
        id,
        taskId,      
        dailyLogId,  
    }) {
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

    static create(executedTaskData) {
        return new ExecutedTask({
            ...executedTaskData,
        });
    }
}

module.exports = ExecutedTask;