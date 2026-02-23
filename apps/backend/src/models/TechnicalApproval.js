class TechnicalApproval {
    constructor({
        id,
        status,
        comments,
        approval_date,
        userId,   
        phaseId,  
    }) {
        this.id = id; 
        this.status = status; 
        this.comments = comments;
        this.approval_date = approval_date;
        this.userId = userId;
        this.phaseId = phaseId;
    }

    toJSON() {
        return {
            id: this.id,
            status: this.status,
            comments: this.comments,
            approval_date: this.approval_date,
            userId: this.userId,
            phaseId: this.phaseId,
        };
    }

    static create(approvalData) {
        return new TechnicalApproval({
            ...approvalData,
        });
    }
}

module.exports = TechnicalApproval;