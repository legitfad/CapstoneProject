import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'set-budget/:id',
    loadChildren: () => import('./set-budget/set-budget.module').then( m => m.SetBudgetPageModule)
  },
  {
    path: 'product-page',
    loadChildren: () => import('./product-page/product-page.module').then( m => m.ProductPagePageModule)
  },
  {
    path: 'add-product-page',
    loadChildren: () => import('./add-product-page/add-product-page.module').then( m => m.AddProductPagePageModule)
  },
  {
    path: 'advertiser-page',
    loadChildren: () => import('./advertiser-page/advertiser-page.module').then( m => m.AdvertiserPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then( m => m.LoginPageModule), ...canActivate(redirectLoggedInToHome)
    
  },
  {
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
  {
    path: 'reward-page',
    loadChildren: () => import('./reward-page/reward-page.module').then( m => m.RewardPagePageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'exchangemodal',
    loadChildren: () => import('./exchangemodal/exchangemodal.module').then( m => m.ExchangemodalPageModule)
  },
  {
    path: 'overview',
    loadChildren: () => import('./overview/overview.module').then( m => m.OverviewPageModule)
  },
  {
    path: 'start-group-modal',
    loadChildren: () => import('./start-group-modal/start-group-modal.module').then( m => m.StartGroupModalPageModule)
  },
  {
    path: 'overview/:chatid',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
