import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MerchNavbar } from '../../shared/merch-navbar/merch-navbar';
import { BankAccountComponent } from './bank-account/bank-account';
import { OverviewComponent } from './overview/overview';
import { TransactionsComponent } from './transactions/transactions';
import { ProductsComponent } from './products/products';
import { SettingsComponent } from './settings/settings';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
   imports: [
    CommonModule,
    MerchNavbar,
    BankAccountComponent,
    OverviewComponent,
    TransactionsComponent,
    ProductsComponent,
    SettingsComponent,
  ],
})
export class Dashboard {
  selectedMenu = 'overview';
  onMenuChange(menu: string) {
    this.selectedMenu = menu;
  }
}
