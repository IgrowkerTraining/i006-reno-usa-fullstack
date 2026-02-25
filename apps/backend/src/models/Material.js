class Material {
    constructor({
        id,
        name,
        unit,
        description,
    }) {
        this.id = id;
        this.name = name;
        this.unit = unit; 
        this.description = description;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            unit: this.unit,
            description: this.description,
        };
    }

    static create(data) {
        return new Material({
            ...data,
        });
    }
}

export default Material;