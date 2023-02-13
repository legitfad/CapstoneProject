import { Component, OnInit , Input } from '@angular/core';
import { RewardService, rewardUi } from '../../services/reward.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  
  @Input() id: any;
  reward: rewardUi = null;

   constructor(private rewardservice: RewardService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

    ngOnInit() {
    this.rewardservice.getRewardById(this.id).subscribe(res => {
      this.reward = res;
    });
  }

  async deleteReward() {
    await this.rewardservice.deleteReward(this.reward)
    this.modalCtrl.dismiss();

    const toast = await this.toastCtrl.create({
      message: 'Reward Deleted!.',
      duration: 100
    });
    toast.present();
  
  }

  async updateReward() {
    await this.rewardservice.updateReward(this.reward);
    this.modalCtrl.dismiss()

    const toast = await this.toastCtrl.create({
      message: 'Reward updated!.',
      duration: 100
    });
    toast.present();

  }

}
