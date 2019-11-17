import { QualificationDetails } from "./QualificationDetails";
import { Binary } from "@angular/compiler";
import { SafeUrl } from "@angular/platform-browser";

export class OpportunityDetails {

    id: number
    opportunityDtlsName: string
    organizationImage: string;
    organizationURL: SafeUrl;
    typeofProfOppurtunity: string;
    workLength: string;
    workHours: string;
    recommendations: string;
    schoolAttendance: string;
    gpaScore: string;
    oppurtunityLongDescription: string;
    qualificationDetails: string[];
    
    constructor() {}
}