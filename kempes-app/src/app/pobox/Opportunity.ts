import { OpportunityDetails } from "./OpportunityDetails";

export class Opportunity {
    
    id: string
    opportunityName: string
    opportunityShortDesc: string;
    organizationName: string;
    organizationAddress: string;
    whenPosted: string;
    opportunityDetails: OpportunityDetails;
    isSaved: boolean;
    typeofProfOppurtunity: string;
    
    constructor() {}
}