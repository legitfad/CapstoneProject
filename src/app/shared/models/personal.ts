import { throws } from "assert";

export class Personal {
    name: string;
    budget: number;
    resetDate: string;
    image: string;
    constructor(name: string, budget: number, resetDate: string, image: string) {
    this.name = name;
    this.budget = budget;
    this.resetDate = resetDate
    this.image = image;
    }
   }