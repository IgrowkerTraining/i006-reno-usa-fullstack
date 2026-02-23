class WorkerCoverage {
    constructor({
        id,
        coverage_status,
        coverage_type,
        policy_reference,
        dailyLogId, 
    }) {
        this.id = id; 
        this.coverage_status = coverage_status;
        this.coverage_type = coverage_type;
        this.policy_reference = policy_reference;
        this.dailyLogId = dailyLogId;
    }

    toJSON() {
        return {
            id: this.id,
            coverage_status: this.coverage_status,
            coverage_type: this.coverage_type,
            policy_reference: this.policy_reference,
            dailyLogId: this.dailyLogId,
        };
    }

    static create(data) {
        return new WorkerCoverage({
            ...data,
        });
    }
}

module.exports = WorkerCoverage;