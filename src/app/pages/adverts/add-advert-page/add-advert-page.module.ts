import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAdvertPagePageRoutingModule } from './add-advert-page-routing.module';

import { AddAdvertPagePage } from './add-advert-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAdvertPagePageRoutingModule
  ],
  declarations: [AddAdvertPagePage]
})
export class AddAdvertPagePageModule {}
