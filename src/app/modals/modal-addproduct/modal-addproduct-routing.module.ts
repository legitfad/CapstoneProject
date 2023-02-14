import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddproductPage } from './modal-addproduct.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddproductPageRoutingModule {}
