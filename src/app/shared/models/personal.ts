import { throws } from "assert";

export class Personal {
    personalName: string;
    personalBudget: number;
    personalResetDate: string;
    id: string;

    constructor(personalName: string, personalBudget: number, personalResetDate: string, id:string) {
    this.personalName = personalName;
    this.personalBudget = personalBudget;
    this.personalResetDate = personalResetDate
    this.id = id;
    }
   }