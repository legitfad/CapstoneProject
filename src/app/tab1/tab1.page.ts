import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SetBudgetPage } from '../set-budget/set-budget.page';
import { Expense } from '../shared/models/expense';
import { Personal } from '../shared/models/personal';
import { PersonalService } from '../shared/services/personal.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  personal: Personal[] = []; // For Setting Budget
  expense: Expense[] = []; // For Personal Expenses for each Item Bought

  constructor(private modalController: ModalController, private personalService: PersonalService) {
    this.personal = this.personalService.getPersonal();

    this.expense = [
      new Expense('Lenovo Monitor', 'Electronics', 590, '06-02-23'),
      new Expense('Razer Keyboard', 'Electronics', 120, '05-01-23'),
      new Expense('Dyson Hairdryer', 'Home Appliances', 50, '02-03-23'),
      new Expense('Uniqlo AIRISM T-Shirt', 'Clothes', 10, '10-03-23'),
      new Expense('Uniqlo Hoodie', 'Clothes', 30, '10-03-23'),
      new Expense('Uniqlo Jeans', 'Clothes', 25, '10-03-23')
    ]
  }
  async set() {
    const modal = await this.modalController.create({
    component: SetBudgetPage,
    cssClass: 'modal-wrapper'
    });
    return await modal.present();
  }
}
