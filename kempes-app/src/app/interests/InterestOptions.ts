import { AnswerOptions } from "./AnswerOptions";

export class InterestOptions {
    id: string;
    interestQuestionName: string;
    interestQuestion: string;
    displayOrder: number;
    answerOptions: AnswerOptions[];
    selectedOptions: string;
    
    constructor() {}
}