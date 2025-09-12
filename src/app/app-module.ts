import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Landing } from './components/landing/landing';
import { HttpClientModule } from '@angular/common/http';
import { UserLoginComponent } from './components/user/login/login';
import { MerchantLoginComponent } from './components/merchant/login/login';
import { UserSignupComponent } from './components/user/signup/signup';
import { MerchantSignupComponent } from './components/merchant/signup/signup';
import { DashboardComponent } from './components/merchant/dashboard/dashboard';
import { MerchNavbar } from './components/shared/merch-navbar/merch-navbar';
import { ReportsComponent } from './components/merchant/dashboard/reports/reports';
import { TransactionsComponent } from './components/merchant/dashboard/transactions/transactions';
import { ProductsComponent } from './components/merchant/dashboard/products/products';
import { SettingsComponent } from './components/merchant/dashboard/settings/settings';
import { BankAccountComponent } from './components/merchant/dashboard/bank-account/bank-account';
import { TopNavbarComponent } from './components/shared/top-navbar/top-navbar';
import { OtpVerify } from './components/user/otp-verify/otp-verify';
import { UserNavbar } from './components/shared/user-navbar/user-navbar';
import { BillsComponent } from './components/user/home/bills/bills';
import { EcommerceComponents } from './components/user/home/ecommerce/ecommerce';
import { UserTransactionsComponent } from './components/user/home/user-transactions/user-transactions';
import { UserbankAccountComponent } from './components/user/home/userbank-account/userbank-account';


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

    //standalone components are here 
    DashboardComponent,
    UserSignupComponent,
    UserLoginComponent,
    OtpVerify,
    MerchantLoginComponent,
    MerchantSignupComponent,

    //Nav Bar
    MerchNavbar,
    TopNavbarComponent,
    UserNavbar,

    //Merchant ke Components
    UserLoginComponent,
    ReportsComponent,
    TransactionsComponent,
    BankAccountComponent,
    ProductsComponent,
    SettingsComponent,

    //User ke Components
    BillsComponent,
    EcommerceComponents,
    UserTransactionsComponent,
    UserbankAccountComponent
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }