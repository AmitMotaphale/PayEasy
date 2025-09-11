import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import standalone components for user auth
import { UserLoginComponent } from './components/user/login/login';
import { UserSignupComponent } from './components/user/signup/signup';

// Import standalone components for merchant auth
import { MerchantLoginComponent } from './components/merchant/login/login';
import { MerchantSignupComponent } from './components/merchant/signup/signup';

// Import other components you already use
import { Landing } from './components/landing/landing';
import { OtpVerify } from './components/otp-verify/otp-verify';
import { DashboardComponent } from './components/merchant/dashboard/dashboard';
import { MerchantAuthGuard } from './guards/merchant-auth-guard';

const routes: Routes = [
  // Landing page
  { path: '', component: Landing },

  // User authentication routes
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/signup', component: UserSignupComponent },
  { path: 'otp-verify', component: OtpVerify },

  // Merchant authentication routes
  { path: 'merchant/login', component: MerchantLoginComponent },
  { path: 'merchant/signup', component: MerchantSignupComponent },

  //Dashboard Started 
  //removing this as I have implemented the Gaurd
  // { path: 'merchant/dashboard', component: Dashboard },
  
  //Gaurd links from here :)
  {
    path: 'merchant/dashboard',
    component: DashboardComponent,
    canActivate: [MerchantAuthGuard]  // Apply the guard here
  },

  // Catch-all redirect to landing or login
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
