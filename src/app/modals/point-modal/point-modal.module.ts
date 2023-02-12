import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointModalPageRoutingModule } from './point-modal-routing.module';

import { PointModalPage } from './point-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointModalPageRoutingModule
  ],
  declarations: [PointModalPage]
})
export class PointModalPageModule {}
