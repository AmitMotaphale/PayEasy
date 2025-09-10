import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './app/components/landing/landing';
import { Login } from './app/components/login/login';
import { Signup } from './app/components/signup/signup';
import { HomeComponent } from './app/components/home/home';      // for users
import { HomebComponent } from './app/components/homeb/homeb';   // for business
import { AccountComponent } from './app/components/account/account';

const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  
  // ✅ Separate user and business home pages
  { path: 'user/home', loadComponent: () => import('./app/components/home/home').then(m => m.HomeComponent) }, // ✅ Correct for standalone
  { path: 'business/home', loadComponent: () => import('./app/components/homeb/homeb').then(m=> m.HomebComponent)},


  { path: 'accounts', component: AccountComponent},
  // ✅ Catch-all
  { path: '**', redirectTo: 'login' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
