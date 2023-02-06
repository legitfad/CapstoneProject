import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/data/firestore.service';

@Component({
  selector: 'app-add-reward-page',
  templateUrl: './add-reward-page.page.html',
  styleUrls: ['./add-reward-page.page.scss'],
})
export class AddRewardPagePage implements OnInit {

    addRewardForm: FormGroup;   
      constructor(
        private readonly loadingCtrl: LoadingController,
        private readonly alertCtrl: AlertController,
        private firestoreService: FirestoreService,
        formBuilder: FormBuilder,
        private router: Router
      ) {
      this.addRewardForm = formBuilder.group({
        rewardName: ['', Validators.required],
        rewardCost: ['', Validators.required],
        rewardDate: ['', Validators.required],
        rewardDescription: ['', Validators.required],
        rewardCategory: ['', Validators.required],
      });    
}
      async addReward() {
        const loading = await this.loadingCtrl.create();

        const rewardName = this.addRewardForm.value.rewardName;
        const rewardCost = this.addRewardForm.value.rewardCost;
        const rewardDate = this.addRewardForm.value.rewardDate;
        const rewardDescription = this.addRewardForm.value.rewardDescription; 
        const rewardCategory = this.addRewardForm.value.rewardCategory; 

        this.firestoreService
        .addReward(rewardName, rewardCost, rewardDate, rewardDescription, rewardCategory)
        .then(
          () => {
            loading.dismiss().then(() => {
              this.router.navigateByUrl('');
            });
          },
          (          error: any) => {
            loading.dismiss().then(() => {
              console.error(error);
            });
          }
    );

  return await loading.present();

}
      
  ngOnInit() {
  }

}
