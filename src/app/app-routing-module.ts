import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './components/landing/landing';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { HomeComponent } from './components/home/home';      // for users
import { HomebComponent } from './components/homeb/homeb';   // for business
import { AccountComponent } from './components/account/account';
import { MerchantComponent } from './components/merchant/merchant';
import { LayoutComponent } from './components/layout/layout';
import { OtpVerify } from './components/otp-verify/otp-verify';

const routes: Routes = [
   { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  {path: 'otp-verify', component: OtpVerify},

  {
    path: 'business/home',
    loadComponent: () =>
      import('./components/homeb/homeb').then((m) => m.HomebComponent),
  },

  // Private area with navbar layout
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'user/home',
        loadComponent: () =>
          import('./components/home/home').then((m) => m.HomeComponent),
      },
      {
        path: 'accounts',
        loadComponent: () =>
          import('./components/account/account').then((m) => m.AccountComponent),
      },
      {
        path: 'merchants',
        loadComponent: () =>
          import('./components/merchant/merchant').then((m) => m.MerchantComponent),
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
