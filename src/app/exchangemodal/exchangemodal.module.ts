import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangemodalPageRoutingModule } from './exchangemodal-routing.module';

import { ExchangemodalPage } from './exchangemodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExchangemodalPageRoutingModule
  ],
  declarations: [ExchangemodalPage]
})
export class ExchangemodalPageModule {}
