import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvertiserProductPageRoutingModule } from './advertiser-product-routing.module';

import { AdvertiserProductPage } from './advertiser-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvertiserProductPageRoutingModule
  ],
  declarations: [AdvertiserProductPage]
})
export class AdvertiserProductPageModule {}
