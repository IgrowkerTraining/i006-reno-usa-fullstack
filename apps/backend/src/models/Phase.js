class Phase {
    constructor({
        id,
        name,
        planned_start,
        planned_end,
        projectId, 
    }) {
        this.id = id; 
        this.name = name;
        this.planned_start = planned_start; 
        this.planned_end = planned_end; 
        this.projectId = projectId;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            planned_start: this.planned_start,
            planned_end: this.planned_end,
            projectId: this.projectId,
        };
    }

    static create(phaseData) {
        return new Phase({
            ...phaseData,
        });
    }
}

export default Phase;