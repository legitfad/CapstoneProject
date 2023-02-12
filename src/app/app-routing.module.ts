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
    loadChildren: () => import('./budget/set-budget/set-budget.module').then( m => m.SetBudgetPageModule)
  },
  {
    path: 'product-page',
    loadChildren: () => import('./pages/products/product-page/product-page.module').then( m => m.ProductPagePageModule)
  },
  {
    path: 'add-product-page',
    loadChildren: () => import('./pages/products/add-product-page/add-product-page.module').then( m => m.AddProductPagePageModule)
  },
  {
    path: 'add-advert-page',
    loadChildren: () => import('./pages/adverts/add-advert-page/add-advert-page.module').then( m => m.AddAdvertPagePageModule)
  },
  {
    path: 'advertiser-page',
    loadChildren: () => import('./pages/adverts/advertiser-page/advertiser-page.module').then( m => m.AdvertiserPagePageModule)
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
    loadChildren: () => import('./pages/rewards/reward-page/reward-page.module').then( m => m.RewardPagePageModule)
  }, 
  {
    path: 'modal',
    loadChildren: () => import('./modals/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'overview',
    loadChildren: () => import('./pages/overview/overview.module').then( m => m.OverviewPageModule)
  },
  {
    path: 'start-group-modal',
    loadChildren: () => import('./modals/start-group-modal/start-group-modal.module').then( m => m.StartGroupModalPageModule)
  },
  {
    path: 'overview/:chatid',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'edit-ad',
    loadChildren: () => import('./pages/adverts/edit-ad/edit-ad.module').then( m => m.EditAdPageModule)
  },
  {
    path: 'adv-detail',
    loadChildren: () => import('./modals/adv-detail/adv-detail.module').then( m => m.AdvDetailPageModule)
  },
  {
    path: 'modal-product',
    loadChildren: () => import('./modals/modal-product/modal-product.module').then( m => m.ModalProductPageModule)
  },
  {
    path: 'expense-modal',
    loadChildren: () => import('./modals/expense-modal/expense-modal.module').then( m => m.ExpenseModalPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./authentication/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'add-productbanner-page',
    loadChildren: () => import('./pages/products/add-productbanner-page/add-productbanner-page.module').then( m => m.AddProductbannerPagePageModule)
  },

  {
    path: 'point-modal',
    loadChildren: () => import('./modals/point-modal/point-modal.module').then( m => m.PointModalPageModule)
  },







];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
