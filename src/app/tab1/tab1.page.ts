import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SetBudgetPage } from '../set-budget/set-budget.page';
import { Personal } from '../shared/models/personal';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  personal: Personal[] = [];
  constructor(private modalController: ModalController) {
    this.personal = [
        new Personal('Jason Chan', 750, '13-Jan-2023', ''),
      ];
  }
  async set() {
    const modal = await this.modalController.create({
    component: SetBudgetPage,
    cssClass: 'modal-wrapper'
    });
    return await modal.present();
    }
}
