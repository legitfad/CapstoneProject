import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-set-budget',
  templateUrl: './set-budget.page.html',
  styleUrls: ['./set-budget.page.scss'],
})
export class SetBudgetPage implements OnInit {
  setBudgetForm: FormGroup;

  constructor(private modalController: ModalController) { 
    this.setBudgetForm = new FormGroup({
      budget: new FormControl(''),
      date: new FormControl('')
      });
  }

  ngOnInit() {
  }

  set() {
    this.modalController.dismiss();
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
