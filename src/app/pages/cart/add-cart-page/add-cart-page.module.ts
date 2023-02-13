import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCartPagePageRoutingModule } from './add-cart-page-routing.module';

import { AddCartPagePage } from './add-cart-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCartPagePageRoutingModule
  ],
  declarations: [AddCartPagePage]
})
export class AddCartPagePageModule {}
