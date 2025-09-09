import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Landing } from './app/components/landing/landing';
import { Login } from './app/components/login/login';
import { Signup } from './app/components/signup/signup';
import { HomeComponent } from './app/components/home/home';
import { HomebComponent } from './app/components/homeb/homeb';

@NgModule({
  declarations: [
    App,
    Landing,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HomeComponent,
    HomebComponent,
    Login,
    Signup
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }