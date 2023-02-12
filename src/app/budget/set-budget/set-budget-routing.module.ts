import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetBudgetPage } from './set-budget.page';

const routes: Routes = [
  {
    path: '',
    component: SetBudgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetBudgetPageRoutingModule {}
