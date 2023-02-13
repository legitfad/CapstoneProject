import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RewardAddPageRoutingModule } from './reward-add-routing.module';

import { RewardAddPage } from './reward-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RewardAddPageRoutingModule
  ],
  declarations: [RewardAddPage]
})
export class RewardAddPageModule {}
