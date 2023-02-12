import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RewardPagePageRoutingModule } from './reward-page-routing.module';

import { RewardPagePage } from './reward-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RewardPagePageRoutingModule
  ],
  declarations: [RewardPagePage]
})
export class RewardPagePageModule {}
