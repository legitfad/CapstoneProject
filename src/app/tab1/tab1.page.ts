import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SetBudgetPage } from '../set-budget/set-budget.page';
import { Personal } from '../shared/models/personal';
import { PersonalService } from '../shared/services/personal.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  personal: Personal[] = [];
  constructor(private modalController: ModalController, private personalService: PersonalService) {
    this.personal = this.personalService.getPersonal();
  }
  async set() {
    const modal = await this.modalController.create({
    component: SetBudgetPage,
    cssClass: 'modal-wrapper'
    });
    return await modal.present();
  }
}
