export class Expense {
    name: string;
    category: string;
    price: number;
    date: string;

    constructor(name: string, category: string, price: number, date: string) {
            this.name = name;
            this.category = category;
            this.price = price;
            this.date = date;
    }
}