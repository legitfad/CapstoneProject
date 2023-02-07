import { Component, OnInit } from '@angular/core';
import { RewardService, rewardUi } from '../services/reward.service';

@Component({
  selector: 'app-reward-page',
  templateUrl: './reward-page.page.html',
  styleUrls: ['./reward-page.page.scss'],
})
export class RewardPagePage implements OnInit {

  rewards: rewardUi[] = [];

  constructor(private RewardService: RewardService) {
    this.RewardService.getRewards().subscribe(res => {console.log(res);
      this.rewards = res;
      }
    )
   }

   

  ngOnInit() {
  }

}
