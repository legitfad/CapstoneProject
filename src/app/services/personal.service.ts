import { Injectable } from '@angular/core';
import { Personal } from 'src/app/models/personal';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface personalUi {
  personalName: string;
  personalBudget: number;
  personalResetDate: string;
  personalId?: string;
}

export interface expenseUi {
  id?: string;
  expenseName: string;
  expenseCategory: string;
  expensePrice: number;
  expenseDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  personal: Personal[] = [];
  expense: expenseUi[] = [];
  FirebaseId = "IHHnse2sBb7SOo91BrFF";

  constructor(private firestore: Firestore) { 
  }

  // Firebase Testing
  getPersonal(): Observable<personalUi[]> {
    const PersonalDocRef = collection(this.firestore, 'personal');
    return collectionData(PersonalDocRef, {idField: 'id'}) as Observable<personalUi[]>;
  }

  // getPersonal(): Personal[] {
  //   return this.personal;
  // }
  updateBudget(Personal: personalUi) {
    const PersonalDocRef = doc(this.firestore, `personal/${this.FirebaseId}`);
    return updateDoc(PersonalDocRef, 
    { 
      personalBudget: Personal.personalBudget, 
      personalResetDate: Personal.personalResetDate 
    });
  }

  getExpense(): Observable<expenseUi[]> {
    const ExpenseDocRef = collection(this.firestore, 'expense');
    return collectionData(ExpenseDocRef, {idField: 'id'}) as Observable<expenseUi[]>;
  }

  addExpense(expense: expenseUi) {
    const expensesRef = collection(this.firestore, 'expense');
    return addDoc(expensesRef, expense);
  }

  deleteExpense(expense: expenseUi) {
    const index = this.expense.findIndex(item => item.id == expense.id);
    if (index >= 0) {
      this.expense.splice(index, 1);
    }
  }

  updateExpense(expense: expenseUi) {
    const expenseDocRef = doc(this.firestore, `expense/${expense.id}`);
    return updateDoc(expenseDocRef, { name: expense.expenseName, category: expense.expenseCategory, price: expense.expensePrice, date: expense.expenseDate });
  }
  // set(p: Personal) {
  //   const index = this.personal.findIndex(item => item.id == p.id);
  //   const pers = this.personal[0];
  //   pers.budget = p.budget;
  //   pers.resetDate = p.resetDate;
  //   }
}
