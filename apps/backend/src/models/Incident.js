class Incident {
    constructor({
        id,
        description,
        incident_date,
        dailyLogId, 
    }) {
        this.id = id; 
        this.description = description;
        this.incident_date = incident_date;
        this.dailyLogId = dailyLogId;
    }

    toJSON() {
        return {
            id: this.id,
            description: this.description,
            incident_date: this.incident_date,
            dailyLogId: this.dailyLogId,
        };
    }

    static create(data) {
        return new Incident({
            ...data,
            incident_date: new Date(), 
        });
    }
}

module.exports = Incident;