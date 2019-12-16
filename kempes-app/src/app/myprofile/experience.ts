export class Experience {
    id: number
    experienceName: string
    roleName: string
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    activityType: string
    activityPoint: string;
    hoursspent: string
    responsibility1: string
    responsibility2: string
    responsibility3: string
    
    
    anythingElse: string;
    userId: string;
    isEditMode: boolean;

    constructor() {
        this.experienceName = "";
        this.roleName = "";
        this.startMonth = "";
        this.startYear = "";
        this.endMonth = "";
        this.endYear = "";
        this.activityType = "";
        this.activityPoint = "";
        this.hoursspent = "";
        this.responsibility1 = "";
        this.responsibility2 = "";
        this.responsibility3 = "";
    }
    
}