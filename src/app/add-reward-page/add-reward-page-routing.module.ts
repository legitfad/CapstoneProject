import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRewardPagePage } from './add-reward-page.page';

const routes: Routes = [
  {
    path: '',
    component: AddRewardPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRewardPagePageRoutingModule {}
