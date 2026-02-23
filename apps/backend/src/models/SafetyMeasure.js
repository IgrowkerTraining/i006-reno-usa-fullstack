class SafetyMeasure {
    constructor({
        id,
        description,
        dailyLogId, 
    }) {
        this.id = id; 
        this.description = description;
        this.dailyLogId = dailyLogId;
    }

    toJSON() {
        return {
            id: this.id,
            description: this.description,
            dailyLogId: this.dailyLogId,
        };
    }

    static create(data) {
        return new SafetyMeasure({
            ...data,
        });
    }
}

module.exports = SafetyMeasure;