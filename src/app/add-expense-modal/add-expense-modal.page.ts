import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Expense } from '../models/expense';
import { PersonalService } from '../services/personal.service';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.page.html',
  styleUrls: ['./add-expense-modal.page.scss'],
})
export class AddExpenseModalPage implements OnInit {
  addExpenseForm: FormGroup;

  constructor(private modalController: ModalController, private personalService: PersonalService) { 
    this.addExpenseForm = new FormGroup({
      name: new FormControl(''),
      category: new FormControl(''),
      price: new FormControl(0),
      date: new FormControl('')
    });
  }

  ngOnInit() {
  }

  add(){
      this.personalService.addExpense({
          expenseName: this.addExpenseForm.value.name,
          expenseCategory: this.addExpenseForm.value.category,
          expensePrice: this.addExpenseForm.value.price,
          expenseDate: this.addExpenseForm.value.date
      });
      this.modalController.dismiss();
    }

  dismiss(){
    this.modalController.dismiss();
  }
}
