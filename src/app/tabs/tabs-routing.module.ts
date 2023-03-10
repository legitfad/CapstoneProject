import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'product-page',
        loadChildren: () => import('../pages/products/product-page/product-page.module').then(m => m.ProductPagePageModule)
      },
      {
        path: 'add-product-page',
        loadChildren: () => import('../pages/products/add-product-page/add-product-page.module').then(m => m.AddProductPagePageModule)
      },
      {
        path: 'reward-page',
        loadChildren: () => import('../pages/rewards/reward-page/reward-page.module').then(m => m.RewardPagePageModule)
      },
      {
        path: 'cart-page',
        loadChildren: () => import('../pages/cart/cart-page/cart-page.module').then(m => m.CartPagePageModule)
      },
     
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
