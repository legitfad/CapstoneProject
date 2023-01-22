import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvertiserPagePageRoutingModule } from './advertiser-page-routing.module';

import { AdvertiserPagePage } from './advertiser-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvertiserPagePageRoutingModule
  ],
  declarations: [AdvertiserPagePage]
})
export class AdvertiserPagePageModule {}
