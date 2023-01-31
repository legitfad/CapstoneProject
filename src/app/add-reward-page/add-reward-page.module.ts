import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRewardPagePageRoutingModule } from './add-reward-page-routing.module';

import { AddRewardPagePage } from './add-reward-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddRewardPagePageRoutingModule
  ],
  declarations: [AddRewardPagePage]
})
export class AddRewardPagePageModule {}
