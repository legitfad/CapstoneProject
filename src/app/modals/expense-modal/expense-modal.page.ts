import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PersonalService, expenseUi } from '../../services/personal.service';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.page.html',
  styleUrls: ['./expense-modal.page.scss'],
})
export class ExpenseModalPage implements OnInit {
  @Input() id: string;
  expense: expenseUi = null;

  constructor(private personalService: PersonalService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.personalService.getExpenseById(this.id).subscribe(res => {
      this.expense = res;
    });
  }

  async deleteExpense() {
    await this.personalService.deleteExpense(this.expense)
    this.modalCtrl.dismiss();
  }

  async updateExpense() {
    await this.personalService.updateExpense(this.expense);
    const toast = await this.toastCtrl.create({
      message: 'Expense updated!.',
      duration: 2000
    });
    toast.present();
  }
}
