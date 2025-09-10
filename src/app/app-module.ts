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
import { AccountComponent } from './app/components/account/account';
import { MerchantComponent } from './app/components/merchant/merchant';
import { LayoutComponent } from './app/components/layout/layout';
import { OtpVerify } from './app/components/otp-verify/otp-verify';
import { HttpClientModule } from '@angular/common/http';


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