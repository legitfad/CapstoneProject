import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  submitted: boolean = false;

  static positiveNumber(fc: FormControl) {
    if (fc.value <= 0) {
      return ({positiveNumber: true});
    } else {
      return (null);
    }
  }

  constructor(private modalController: ModalController, private personalService: PersonalService) { 
    this.addExpenseForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  add(){
    this.submitted = true;
    
    if(this.addExpenseForm.valid){
      this.personalService.addExpense({
        expenseName: this.addExpenseForm.value.name,
        expenseCategory: this.addExpenseForm.value.category,
        expensePrice: this.addExpenseForm.value.price,
        expenseDate: this.addExpenseForm.value.date
    });
    this.modalController.dismiss();
    }
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
