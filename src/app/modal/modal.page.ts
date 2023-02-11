import { Component, OnInit , Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { RewardService, rewardUi } from '../services/reward.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  
  @Input() id: any;
  reward: rewardUi = null;

   constructor(private dataService: RewardService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

    ngOnInit() {
    this.dataService.getRewardById(this.id).subscribe(res => {
      this.reward = res;
    });
  }

  async deleteReward() {
    await this.dataService.deleteReward(this.reward)
    this.modalCtrl.dismiss();

    const toast = await this.toastCtrl.create({
      message: 'Reward Deleted!.',
      duration: 100
    });
    toast.present();

  }

  async updateReward() {
    await this.dataService.updateReward(this.reward);
    this.modalCtrl.dismiss()

    const toast = await this.toastCtrl.create({
      message: 'Reward updated!.',
      duration: 100
    });
    toast.present();

  }

}
