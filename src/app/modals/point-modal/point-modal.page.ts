import { Component, Input, OnInit } from '@angular/core';
import { PointService, pointUI } from '../../services/point.service';
import { RewardService, rewardUi } from '../../services/reward.service';
import { PersonalService, personalUi } from '../../services/personal.service';
import { ModalController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-point-modal',
  templateUrl: './point-modal.page.html',
  styleUrls: ['./point-modal.page.scss'],
})
export class PointModalPage implements OnInit {

  @Input() pointid: any;
  @Input() rewardid: any;
  personalid = 'MyId';
  reward: rewardUi = null;
  personal: personalUi =null;
  personals: personalUi []=[];
  datetime = new Date().toDateString();


   constructor(private pointservice: PointService, private rewardservice: RewardService,private personalService: PersonalService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.rewardservice.getRewardById(this.rewardid).subscribe(res => {
      this.reward = res;
    });
    this.personalService.getPersonalId(this.personalid).subscribe(res => {console.log(res);
      this.personal = res;
    });
    this.personalService.getPersonal().subscribe(res => {console.log(res);
      this.personals = res;
    });
    
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }


  async redeemReward(){
     await this.pointservice.redeemReward( { 
              point: 'test',
              pointDate: this.datetime, 
              purpose: 'Redeem', 
              personalID: 'MyId', 
              rewardID: this.reward.id });
              this.modalCtrl.dismiss()

    const toast = await this.toastCtrl.create({
      message: 'Redeem Succesfully!',
      duration: 600
    });
    toast.present();
    }
    async cancelReward(){
      this.modalCtrl.dismiss()
    }

    
  }
  

