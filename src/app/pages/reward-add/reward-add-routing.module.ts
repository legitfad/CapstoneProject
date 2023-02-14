import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardAddPage } from './reward-add.page';

const routes: Routes = [
  {
    path: '',
    component: RewardAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RewardAddPageRoutingModule {}
