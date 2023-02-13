import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RewardService, rewardUi } from '../../../services/reward.service';
import { PersonalService, personalUi } from '../../../services/personal.service';
import { PointService, pointUI } from '../../../services/point.service';
import { ModalPage } from '../../../modals/modal/modal.page';
import { PointModalPage } from '../../../modals/point-modal/point-modal.page';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AdvertUI, DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-reward-page',
  templateUrl: './reward-page.page.html',
  styleUrls: ['./reward-page.page.scss'],
})
export class RewardPagePage implements OnInit {

  rewardUI:rewardUi;
  rewards: rewardUi[] = [];
  filteredRewards: rewardUi[];
  personals: personalUi[] = []; 
  points: pointUI[] = []; 
  capturedImage = null;

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

    async addReward() {
    const alert = await this.alertCtrl.create({
      header: 'Add Reward',
      inputs: [
        {
          name: 'rewardName',
          placeholder: 'Reward Name',
          type: 'text',
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
          text: 'image',
          handler:res => {
            this.addImage();
            }
        },{
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

  async addImage() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      source: CameraSource.Photos,
      resultType: CameraResultType.Base64
    });
    console.log('result: ', image);
    this.capturedImage = `data:image/jpeg;base64,${image.base64String}`;
    this.rewardUI.rewardImage = image.base64String;
  }
  
  ngOnInit() {
   
  }
   filterData(category: string) {
    this.filteredRewards = this.rewards.filter(reward => reward.rewardCategory === category);
}
  
}
