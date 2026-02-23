class Project {
    constructor({
        id,
        code,
        name,
        location,
        surface_sqft,
        structure_type,
        intervention_type,
        userId,
    }) {
        this.id = id; 
        this.code = code;
        this.name = name;
        this.location = location;
        this.surface_sqft = surface_sqft;
        this.structure_type = structure_type;
        this.intervention_type = intervention_type;
        this.userId = userId;
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            name: this.name,
            location: this.location,
            surface_sqft: this.surface_sqft,
            structure_type: this.structure_type,
            intervention_type: this.intervention_type,
            userId: this.userId,
        };
    }

    static create(projectData) {
        const currentYear = new Date().getFullYear();

        return new Project({
            ...projectData,
            code: `RENO-US-${currentYear}-${Math.floor(
                Math.random() * 1000
            )
                .toString()
                .padStart(3, "0")}`,
        });
    }
}

module.exports = Project;