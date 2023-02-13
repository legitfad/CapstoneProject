import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAdvertProductPageRoutingModule } from './add-advert-product-routing.module';

import { AddAdvertProductPage } from './add-advert-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAdvertProductPageRoutingModule
  ],
  declarations: [AddAdvertProductPage]
})
export class AddAdvertProductPageModule {}
