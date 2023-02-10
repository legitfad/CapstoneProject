import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAdvertPagePage } from './add-advert-page.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdvertPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdvertPagePageRoutingModule {}
