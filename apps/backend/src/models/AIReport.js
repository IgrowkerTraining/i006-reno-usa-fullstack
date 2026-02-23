class AIReport {
    constructor({
        id,
        generated_at,
        summary,
        projectSnapshotId, 
    }) {
        this.id = id; 
        this.generated_at = generated_at;
        this.summary = summary;
        this.projectSnapshotId = projectSnapshotId;
    }

    toJSON() {
        return {
            id: this.id,
            generated_at: this.generated_at,
            summary: this.summary,
            projectSnapshotId: this.projectSnapshotId,
        };
    }

    static create(reportData) {
        return new AIReport({
            ...reportData,
            generated_at: new Date(),
        });
    }
}

module.exports = AIReport;