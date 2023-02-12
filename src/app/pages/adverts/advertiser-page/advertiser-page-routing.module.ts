import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertiserPagePage } from './advertiser-page.page';

const routes: Routes = [
  {
    path: '',
    component: AdvertiserPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertiserPagePageRoutingModule {}
