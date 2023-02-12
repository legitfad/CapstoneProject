import { throws } from "assert";

export class Personal {
    personalName: string;
    personalBudget: number;
    personalResetDate: string;
    id: string;
    personalPoint: number;

    constructor(personalName: string, personalBudget: number, personalResetDate: string, id:string , personalPoint: number) {
    this.personalName = personalName;
    this.personalBudget = personalBudget;
    this.personalResetDate = personalResetDate;
    this.id = id;
    this.personalPoint = personalPoint;
    }
   }