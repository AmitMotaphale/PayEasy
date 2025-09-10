import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './app/components/landing/landing';
import { Login } from './app/components/login/login';
import { Signup } from './app/components/signup/signup';
import { HomeComponent } from './app/components/home/home';      // for users
import { HomebComponent } from './app/components/homeb/homeb';   // for business
import { AccountComponent } from './app/components/account/account';
import { MerchantComponent } from './app/components/merchant/merchant';
import { LayoutComponent } from './app/components/layout/layout';

const routes: Routes = [
   { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  {
    path: 'business/home',
    loadComponent: () =>
      import('./app/components/homeb/homeb').then((m) => m.HomebComponent),
  },

  // Private area with navbar layout
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'user/home',
        loadComponent: () =>
          import('./app/components/home/home').then((m) => m.HomeComponent),
      },
      {
        path: 'accounts',
        loadComponent: () =>
          import('./app/components/account/account').then((m) => m.AccountComponent),
      },
      {
        path: 'merchants',
        loadComponent: () =>
          import('./app/components/merchant/merchant').then((m) => m.MerchantComponent),
      },
    ],
  },
  // ✅ Catch-all
  { path: '**', redirectTo: 'login' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
