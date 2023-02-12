import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ExpenseModalPage } from '../expense-modal/expense-modal.page';
import { SetBudgetPage } from '../budget/set-budget/set-budget.page';
import { Expense } from '../models/expense';
import { Personal } from '../models/personal';
import { expenseUi, PersonalService, personalUi } from '../services/personal.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  personals: personalUi[] = []; // For Setting Budget
  expenses: expenseUi[] = []; // For Personal Expenses for each Item Bought

  constructor(private personalService: PersonalService, private alertCtrl: AlertController, private modalController: ModalController, private toastCtrl: ToastController, private cd: ChangeDetectorRef) {
    
    // this.expenses.forEach(prod => this.totalExpense += prod.expensePrice)

    this.personalService.getPersonal().subscribe(res => {console.log(res);
      this.personals = res;
      }
    )

    this.personalService.getExpense().subscribe(res => {console.log(res);
      this.expenses = res;
      }
    )

    // this.personalService.total().subscribe(res => {console.log(res);
    //   this.expenses = res;
    // })
  }
  async set() {
    const modal = await this.modalController.create({
    component: SetBudgetPage,
    cssClass: 'modal-wrapper'
    });
    return await modal.present();
  }

  async addExpense() {
    const alert = await this.alertCtrl.create({
      header: 'Add Expense',
      inputs: [
        {
          name: 'expenseName',
          placeholder: 'Name of Product',
          type: 'text'
        },
        {
          name: 'expenseCategory',
          placeholder: 'Category of Product',
          type: 'text'
        },
        {
          name: 'expensePrice',
          placeholder: 'Price of Product',
          type: 'number'
        },
        {
          name: 'expenseDate',
          placeholder: 'Date of Expense',
          type: 'date'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.personalService.addExpense({ 
              expenseName: res.expenseName, 
              expenseCategory: res.expenseCategory,
              expensePrice: res.expensePrice,
              expenseDate: res.expenseDate 
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async openExpense (expense: expenseUi) {
    const modal = await this.modalController.create({
      component: ExpenseModalPage,
      componentProps: { id: expense.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
    await modal.present();
  }

  ngOnInit() {
  }
}
