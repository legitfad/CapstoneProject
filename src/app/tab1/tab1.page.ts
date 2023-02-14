import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ExpenseModalPage } from '../modals/expense-modal/expense-modal.page';
import { SetBudgetPage } from '../budget/set-budget/set-budget.page';
import { Expense } from '../models/expense';
import { Personal } from '../models/personal';
import { expenseUi, PersonalService, personalUi } from 'src/app/services/personal.service';
import { AuthService } from '../services/auth.service';
import { AddExpenseModalPage } from '../add-expense-modal/add-expense-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  personals: personalUi[] = []; // For Setting Budget
  expenses: expenseUi[] = []; // For Personal Expenses for each Item Bought
  totalExpense = 0;
  budget = 0;
  savings = 0;
  savingStatus: boolean = false;

  constructor(
    private personalService: PersonalService, 
    private alertCtrl: AlertController, 
    private modalController: ModalController, 
    private toastCtrl: ToastController, 
    private cd: ChangeDetectorRef,
    private authService: AuthService) {
    
    this.personalService.getPersonal().subscribe(res => {console.log(res);
      this.personals = res;
      }
    )
    this.personalService.getExpense().subscribe(res => {console.log(res);
      this.expenses = res;
      }
    )
    this.calcTotalExpense();
    this.calcSavings();
    this.checkSavings();
  }

  calcTotalExpense(){
    this.totalExpense = 0;
    for (const q of this.expenses){
      this.totalExpense += Number(q.expensePrice || 0);
    }
    this.checkSavings();
    return this.totalExpense;
  }
  
  calcSavings(){
    this.savings = 0;
    for (const q of this.personals){
      this.budget = Number(q.personalBudget || 0);
    }
    this.savings = this.budget - this.totalExpense;
    this.checkSavings();
    return this.savings
  }

  checkSavings(){
    if(this.totalExpense > this.budget) {
      this.savingStatus = true;
    }
    else {
      this.savingStatus = false;
    }
  }

  async set() {
    const modal = await this.modalController.create({
    component: SetBudgetPage,
    cssClass: 'modal-wrapper'
    });
    return await modal.present();
  }

  async addExpense() {
    const modal = await this.modalController.create({
      component: AddExpenseModalPage,
      cssClass: 'modal-wrapper'
      });
    this.checkSavings();
    return await modal.present();
  }

  async openExpense (expense: expenseUi) {
    const modal = await this.modalController.create({
      component: ExpenseModalPage,
      componentProps: { id: expense.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
    this.checkSavings();
    await modal.present();
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }
}
