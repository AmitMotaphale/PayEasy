import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './app/components/landing/landing';
import { Login } from './app/components/login/login';
import { Signup } from './app/components/signup/signup';
import { Home } from './app/components/home/home';

const routes: Routes = [
  { path: '', component: Landing},
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'home', component: Home }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }