import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardPagePage } from './reward-page.page';

const routes: Routes = [
  {
    path: '',
    component: RewardPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RewardPagePageRoutingModule {}
