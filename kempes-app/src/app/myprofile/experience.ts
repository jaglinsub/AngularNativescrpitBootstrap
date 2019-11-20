export class Experience {
    id: number
    experienceName: string
    roleName: string
    activity: string
    hoursspent: string
    learnings: string
    location: string
    startDate: string
    endDate: string
    anythingElse: string;
    userId: string;
    isEditMode: boolean;

    constructor() {
        this.experienceName = "";
        this.roleName = "";
        this.activity = "";
        this.hoursspent = "";
        this.learnings = "";
        this.location = "";
        this.startDate = "";
        this.endDate = "";
        this.anythingElse = "";
    }
    
}