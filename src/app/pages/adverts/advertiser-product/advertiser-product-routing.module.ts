import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertiserProductPage } from './advertiser-product.page';

const routes: Routes = [
  {
    path: '',
    component: AdvertiserProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertiserProductPageRoutingModule {}
