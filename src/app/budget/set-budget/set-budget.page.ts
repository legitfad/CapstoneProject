import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Personal } from '../../models/personal';
import { PersonalService, personalUi } from 'src/app/services/personal.service';

@Component({
  selector: 'app-set-budget',
  templateUrl: './set-budget.page.html',
  styleUrls: ['./set-budget.page.scss'],
})
export class SetBudgetPage implements OnInit {
  personal: personalUi = null;
  personalId: string;
  setBudgetForm: FormGroup;

  constructor(private modalController: ModalController, private toastCtrl: ToastController, private route: ActivatedRoute, private router: Router, private personalService: PersonalService) { 
    // this.personal = this.personalService.getPersonal();

    this.personalId = this.route.snapshot.params['id'];

    this.setBudgetForm = new FormGroup({
      budget: new FormControl(0),
      date: new FormControl(''),
      point: new FormControl('')
    });
  }

  ngOnInit() {
  }

  set() {
    const pers = new Personal(
    this.setBudgetForm.value.name,
    this.setBudgetForm.value.budget,
    this.setBudgetForm.value.date,
    "MyId",
    this.setBudgetForm.value.point
    )
    
    this.personalService.updateBudget(pers);
    
    this.modalController.dismiss();
  }

  dismiss(){
    this.modalController.dismiss();
  }
}
