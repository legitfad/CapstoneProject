import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RewardService, rewardUi } from '../services/reward.service';
//import { ModalPage } from '../modal/modal.page';



@Component({
  selector: 'app-reward-page',
  templateUrl: './reward-page.page.html',
  styleUrls: ['./reward-page.page.scss'],
})
export class RewardPagePage implements OnInit {

  rewards: rewardUi[] = [];

  constructor(private RewardService: RewardService, private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.RewardService.getRewards().subscribe(res => {console.log(res);
      this.rewards = res;
      }
    )
   }

    async addReward() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'rewardName',
          placeholder: 'Reward Name',
          type: 'text'
        },
        {
          name: 'rewardCost',
          placeholder: 'Reward Cost',
          type: 'textarea'
        },
        {
          name: 'rewardDate',
          placeholder: 'Reward Date',
          type: 'textarea'
        },
        {
          name: 'rewardDetail',
          placeholder: 'Reward Detail',
          type: 'textarea'
        },
        {
          name: 'rewardCategory',
          placeholder: 'Reward Category',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.RewardService.addReward( { rewardName: res.rewardName, 
              rewardCost: res.rewardCost , 
              rewardDate: res.rewardDate, 
              rewardDetail: res.rewardDetail, 
              rewardCategory: res.rewardCategory });
                  }
        }
      ]
    });
      await alert.present();
  }

 
  ngOnInit() {
  }

}
