import { Component, Input, OnInit } from '@angular/core';
import { PointService, pointUI } from '../../services/point.service';
import { RewardService, rewardUi } from '../../services/reward.service';
import { ModalController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-point-modal',
  templateUrl: './point-modal.page.html',
  styleUrls: ['./point-modal.page.scss'],
})
export class PointModalPage implements OnInit {

  @Input() pointid: any;
  @Input() rewardid: any;
  point: pointUI = null;
  reward: rewardUi = null;


   constructor(private pointservice: PointService, private rewardservice: RewardService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.pointservice.getPointById(this.pointid).subscribe(res => {
      this.point = res;
    });
    this.rewardservice.getRewardById(this.rewardid).subscribe(res => {
      this.reward = res;
    });
  }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }

}
