import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvDetailPageRoutingModule } from './adv-detail-routing.module';

import { AdvDetailPage } from './adv-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvDetailPageRoutingModule
  ],
  declarations: [AdvDetailPage]
})
export class AdvDetailPageModule {}
