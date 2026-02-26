class MaterialUsage {
    constructor({
        id,
        quantity,
        executedTaskId,
        materialId,
    }) {
        this.id = id;
        this.quantity = quantity;
        this.executedTaskId = executedTaskId;
        this.materialId = materialId;
    }

    toJSON() {
        return {
            id: this.id,
            quantity: this.quantity,
            executedTaskId: this.executedTaskId,
            materialId: this.materialId,
        };
    }

    static create(data) {
        return new MaterialUsage({
            ...data,
        });
    }
}

export default MaterialUsage;