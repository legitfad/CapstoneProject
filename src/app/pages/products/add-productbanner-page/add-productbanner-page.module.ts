import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductbannerPagePageRoutingModule } from './add-productbanner-page-routing.module';

import { AddProductbannerPagePage } from './add-productbanner-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProductbannerPagePageRoutingModule
  ],
  declarations: [AddProductbannerPagePage]
})
export class AddProductbannerPagePageModule {}
