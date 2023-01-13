import { throws } from "assert";

export class Personal {
    name: string;
    budget: number;
    resetDate: string;
    id: string;

    constructor(name: string, budget: number, resetDate: string, id:string) {
    this.name = name;
    this.budget = budget;
    this.resetDate = resetDate
    this.id = id;
    }
   }