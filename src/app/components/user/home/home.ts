import { Component } from '@angular/core';
import { UserNavbar } from "../../shared/user-navbar/user-navbar";
import { BillsComponent } from './bills/bills';
import { EcommerceComponents } from './ecommerce/ecommerce';
import { UserTransactionsComponent } from './user-transactions/user-transactions';
import { UserbankAccountComponent } from './userbank-account/userbank-account';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    UserNavbar,
    BillsComponent,
    EcommerceComponents,
    UserTransactionsComponent,
    UserbankAccountComponent,
],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  selectedMenu = 'bills';
  onMenuChange(menu: string) {
    this.selectedMenu = menu;
  }
}
