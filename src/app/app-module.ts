import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Landing } from './components/landing/landing';
import { Signup } from './components/signup/signup';
import { HomeComponent } from './components/home/home';
import { HomebComponent } from './components/homeb/homeb';
import { AccountComponent } from './components/account/account';
import { MerchantComponent } from './components/merchant/merchant';
import { LayoutComponent } from './components/layout/layout';
import { OtpVerify } from './components/otp-verify/otp-verify';
import { HttpClientModule } from '@angular/common/http';
import { Login } from './components/login/login';


@NgModule({
  declarations: [
    App,
    Landing,  
      
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    HomeComponent,
    HomebComponent,
    Login,
    OtpVerify,
    Signup,
    AccountComponent,
    MerchantComponent,
    LayoutComponent
    
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }