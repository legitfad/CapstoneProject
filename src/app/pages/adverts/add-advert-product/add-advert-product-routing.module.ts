import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAdvertProductPage } from './add-advert-product.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdvertProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdvertProductPageRoutingModule {}
