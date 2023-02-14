import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddproductPageRoutingModule } from './modal-addproduct-routing.module';

import { ModalAddproductPage } from './modal-addproduct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModalAddproductPageRoutingModule
  ],
  declarations: [ModalAddproductPage]
})
export class ModalAddproductPageModule {}
