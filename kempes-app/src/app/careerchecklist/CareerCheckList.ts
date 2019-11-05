import { CareerCheckListItems } from "./CareerCheckListItems";

export class CareerCheckList {
    
    id: string;
    checkListTitle: string;
    displayOrder: number;
    careerCheckListItems: CareerCheckListItems[];
    subTotals: number;

    constructor() {}
}