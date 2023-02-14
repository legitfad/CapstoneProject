import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddExpenseModalPageRoutingModule } from './add-expense-modal-routing.module';

import { AddExpenseModalPage } from './add-expense-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddExpenseModalPageRoutingModule
  ],
  declarations: [AddExpenseModalPage]
})
export class AddExpenseModalPageModule {}
