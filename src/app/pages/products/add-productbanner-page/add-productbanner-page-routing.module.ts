import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProductbannerPagePage } from './add-productbanner-page.page';

const routes: Routes = [
  {
    path: '',
    component: AddProductbannerPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProductbannerPagePageRoutingModule {}
