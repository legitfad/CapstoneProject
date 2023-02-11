export class Expense {
    expenseName: string;
    expenseCategory: string;
    expensePrice: number;
    expenseDate: string;

    constructor(expenseName: string, expenseCategory: string, expensePrice: number, expenseDate: string) {
        this.expenseName = expenseName;
        this.expenseCategory = expenseCategory;
        this.expensePrice = expensePrice;
        this.expenseDate = expenseDate;
    }
}