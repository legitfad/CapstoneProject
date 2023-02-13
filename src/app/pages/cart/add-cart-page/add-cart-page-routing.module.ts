import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCartPagePage } from './add-cart-page.page';

const routes: Routes = [
  {
    path: '',
    component: AddCartPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCartPagePageRoutingModule {}
