import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RewardService, rewardUi } from '../../../services/reward.service';
import { PersonalService, personalUi } from '../../../services/personal.service';
import { PointService, pointUI } from '../../../services/point.service';
import { ModalPage } from '../../../modals/modal/modal.page';
import { PointModalPage } from '../../../modals/point-modal/point-modal.page';




@Component({
  selector: 'app-reward-page',
  templateUrl: './reward-page.page.html',
  styleUrls: ['./reward-page.page.scss'],
})
export class RewardPagePage implements OnInit {

  rewards: rewardUi[] = [];
  filteredRewards: rewardUi[];
  personals: personalUi[] = []; 
  points: pointUI[] = []; 

  constructor(private RewardService: RewardService, private personalService: PersonalService, 
    private PointService: PointService,private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.RewardService.getRewards().subscribe(res => {console.log(res);
      this.rewards = res;
      }
    )
     this.personalService.getPersonal().subscribe(res => {console.log(res);
      this.personals = res;
      }
    )
    this.PointService.getPoints().subscribe(res => {console.log(res);
      this.points = res;
      }
    )
   }
    filterData(category: string) {
    this.filteredRewards = this.rewards.filter(reward => reward.rewardCategory === category);
}

    async addReward() {
    const alert = await this.alertCtrl.create({
      header: 'Add Reward',
      inputs: [
        {
          name: 'rewardName',
          placeholder: 'Reward Name',
          type: 'text'
        },
        {
          name: 'rewardCost',
          placeholder: 'Reward Cost',
          type: 'text'
        },
        {
          name: 'rewardImage',
          placeholder: 'Reward Image URL',
          type: 'text'
        },
       
        {
          name: 'rewardCategory',
          placeholder: 'Reward Category',
          type: 'text'
        },

        {
        name: 'rewardDetail',
        placeholder: 'Reward Detail',
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
            this.RewardService.addReward( { 
              rewardName: res.rewardName, 
              rewardCost: res.rewardCost , 
              rewardImage: res.rewardImage, 
              rewardDetail: res.rewardDetail, 
              rewardCategory: res.rewardCategory });
            }
        }
      ]
    });
      await alert.present();
  }

  async openReward(reward: rewardUi) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: reward.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }

  async exchangeReward(point: pointUI, reward: rewardUi) {
    const modal = await this.modalCtrl.create({
      component: PointModalPage, 
      componentProps: { pointid: point.id, rewardid:reward.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }
  
  ngOnInit() {
  }
  

}
