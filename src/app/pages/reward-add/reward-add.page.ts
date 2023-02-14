import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RewardService, rewardUi } from '../../services/reward.service';
import { PersonalService, personalUi } from '../../services/personal.service';
import { PointService, pointUI } from '../../services/point.service';
import { ModalPage } from '../../modals/modal/modal.page';
import { PointModalPage } from '../../modals/point-modal/point-modal.page';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-reward-add',
  templateUrl: './reward-add.page.html',
  styleUrls: ['./reward-add.page.scss'],
})
export class RewardAddPage implements OnInit {

  rewards: rewardUi[] = [];
  filteredRewards: rewardUi[];
  personals: personalUi[] = []; 
  points: pointUI[] = []; 
  capturedImage = null;
  showall = null;

  rewardUI: rewardUi = {
    rewardName: '',
    rewardCost: 2000, 
    rewardCategory: '',
    rewardImage:'assets/reward-icon/bottle.jpg',
    rewardDetail: '',
  };

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
  ngOnInit() {
  this.showall = true;
  }
   filterData(category: string) {
    this.showall = false;
    this.filteredRewards = this.rewards.filter(reward => reward.rewardCategory === category);
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

  async openRedeem( reward: rewardUi) {
    const modal = await this.modalCtrl.create({
      component: PointModalPage, 
      componentProps: { rewardid:reward.id },
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
  }
  
async save() {
    this.RewardService.addReward(this.rewardUI)
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
}
