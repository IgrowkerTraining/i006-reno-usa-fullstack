class Task {
    constructor({
        id,
        name,
        description,
        phaseId,
        tradeId,
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.phaseId = phaseId;
        this.tradeId = tradeId;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            phaseId: this.phaseId,
            tradeId: this.tradeId,
        };
    }

    static create(taskData) {
        return new Task({
            ...taskData,
        });
    }
}

export default Task;