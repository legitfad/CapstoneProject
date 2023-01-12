import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetBudgetPageRoutingModule } from './set-budget-routing.module';

import { SetBudgetPage } from './set-budget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    IonicModule,
    SetBudgetPageRoutingModule
  ],
  declarations: [SetBudgetPage]
})

export class SetBudgetPageModule {}
