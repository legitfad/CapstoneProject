import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Personal } from '../shared/models/personal';
import { PersonalService } from '../shared/services/personal.service';

@Component({
  selector: 'app-set-budget',
  templateUrl: './set-budget.page.html',
  styleUrls: ['./set-budget.page.scss'],
})
export class SetBudgetPage implements OnInit {
  personal: Personal[] = [];
  personalId: string;
  setBudgetForm: FormGroup;

  constructor(private modalController: ModalController, private route: ActivatedRoute, private router: Router, private personalService: PersonalService) { 
    this.personal = this.personalService.getPersonal();

    this.personalId = this.route.snapshot.params['id'];

    this.setBudgetForm = new FormGroup({
      budget: new FormControl(0),
      date: new FormControl('')
    });
  }

  ngOnInit() {
  }

  set() {
    const pers = new Personal(
    this.setBudgetForm.value.name,
    this.setBudgetForm.value.budget,
    this.setBudgetForm.value.date,
    this.setBudgetForm.value.name)
    
    this.personalService.set(pers);
    
    this.modalController.dismiss();
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
