import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Landing } from './components/landing/landing';
import { OtpVerify } from './components/otp-verify/otp-verify';
import { HttpClientModule } from '@angular/common/http';
import { UserLoginComponent } from './components/user/login/login';
import { MerchantLoginComponent } from './components/merchant/login/login';
import { UserSignupComponent } from './components/user/signup/signup';
import { MerchantSignupComponent } from './components/merchant/signup/signup';
import { Dashboard } from './components/merchant/dashboard/dashboard';
import { MerchNavbar } from './components/shared/merch-navbar/merch-navbar';
import { OverviewComponent } from './components/merchant/dashboard/overview/overview';
import { TransactionsComponent } from './components/merchant/dashboard/transactions/transactions';
import { ProductsComponent } from './components/merchant/dashboard/products/products';
import { SettingsComponent } from './components/merchant/dashboard/settings/settings';
import { BankAccountComponent } from './components/merchant/dashboard/bank-account/bank-account';


@NgModule({
  declarations: [
    App,
    Landing
      
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,

    //standalone components are here 
    Dashboard,
    UserSignupComponent,
    UserLoginComponent,
    OtpVerify,
    MerchantLoginComponent,
    MerchantSignupComponent,
    MerchNavbar,
    OverviewComponent,
    TransactionsComponent,
    BankAccountComponent,
    ProductsComponent,
    SettingsComponent
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }