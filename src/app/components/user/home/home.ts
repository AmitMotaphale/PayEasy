import { Component } from '@angular/core';
import { UserNavbar } from "../../shared/user-navbar/user-navbar";
import { UserBillsComponent } from './bills/bills';
import { ProductEcommerceComponents } from './ecommerce/ecommerce';
import { UserTransactionsComponent } from './user-transactions/user-transactions';
import { UserbankAccountComponent } from './userbank-account/userbank-account';
import { CommonModule } from '@angular/common';
import { UserhomeComponent } from './userhome/userhome';
import { WalletComponent } from './wallet/wallet';
import { UserprofileComponent } from './userprofile/userprofile';
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    UserNavbar,
    UserBillsComponent,
    ProductEcommerceComponents,
    UserTransactionsComponent,
    UserbankAccountComponent,
    UserhomeComponent,
    UserprofileComponent,
    WalletComponent,
],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  selectedMenu = 'userhome';
  onMenuChange(menu: string) {
    this.selectedMenu = menu;
  }
}
