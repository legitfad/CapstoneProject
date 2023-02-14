import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BufferPageRoutingModule } from './buffer-routing.module';

import { BufferPage } from './buffer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BufferPageRoutingModule
  ],
  declarations: [BufferPage]
})
export class BufferPageModule {}
