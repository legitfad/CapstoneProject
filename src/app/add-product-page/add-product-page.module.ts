import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductPagePageRoutingModule } from './add-product-page-routing.module';

import { AddProductPagePage } from './add-product-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProductPagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddProductPagePage]
})
export class AddProductPagePageModule {}
