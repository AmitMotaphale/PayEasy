import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MerchNavbar } from '../../shared/merch-navbar/merch-navbar';
import { BankAccountComponent } from './bank-account/bank-account';
import { ReportsComponent } from './reports/reports';
import { TransactionsComponent } from './transactions/transactions';
import { ProductsComponent } from './products/products';
import { SettingsComponent } from './settings/settings';
import { TopNavbarComponent } from '../../shared/top-navbar/top-navbar';
import { Footer } from '../../shared/footer/footer';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
   imports: [
    CommonModule,
    MerchNavbar,
    TopNavbarComponent,
    BankAccountComponent,
    ReportsComponent,
    TransactionsComponent,
    ProductsComponent,
    SettingsComponent,
    Footer,
  ],
})
export class DashboardComponent  {
  selectedMenu = 'reports';
  onMenuChange(menu: string) {
    this.selectedMenu = menu;
  }
}
