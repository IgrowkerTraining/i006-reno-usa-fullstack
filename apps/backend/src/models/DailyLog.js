class DailyLog {
    constructor({
        id,
        notes,
        log_date,
        completion_percentage,
        schedule_deviation,
        userId,  
        phaseId,  
    }) {
        this.id = id; 
        this.notes = notes;
        this.log_date = log_date;
        this.completion_percentage = completion_percentage;
        this.schedule_deviation = schedule_deviation;
        this.userId = userId;
        this.phaseId = phaseId;
    }

    toJSON() {
        return {
            id: this.id,
            notes: this.notes,
            log_date: this.log_date,
            completion_percentage: this.completion_percentage,
            schedule_deviation: this.schedule_deviation,
            userId: this.userId,
            phaseId: this.phaseId,
        };
    }

    static create(dailyLogData) {
        return new DailyLog({
            ...dailyLogData,
        });
    }
}

module.exports = DailyLog;