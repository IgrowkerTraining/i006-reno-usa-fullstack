class ProjectSnapshot {
    constructor({
        id,
        snapshot_date,
        period_label,
        projectId, 
    }) {
        this.id = id; 
        this.snapshot_date = snapshot_date;
        this.period_label = period_label; 
        this.projectId = projectId;
    }

    toJSON() {
        return {
            id: this.id,
            snapshot_date: this.snapshot_date,
            period_label: this.period_label,
            projectId: this.projectId,
        };
    }

    static create(snapshotData) {
        return new ProjectSnapshot({
            ...snapshotData,
        });
    }
}

module.exports = ProjectSnapshot;