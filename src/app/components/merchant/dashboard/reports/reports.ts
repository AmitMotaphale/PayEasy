import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent} from "../transactions/transactions";
import { TransactionService , Transaction} from '../../../../services/transactions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.html',
  styleUrl: './reports.css',
  imports: [CommonModule , TransactionsComponent]
})
export class ReportsComponent implements OnInit{
  merchantName: string = '';
  totalProducts: number = 0;
  totalRevenue: number = 0;
  totalTransactions: number = 0;

  recentTransactions: Transaction[] = [];

  constructor(private txnService: TransactionService, private http: HttpClient) {}

  ngOnInit() {
    // Fetch merchant name
    this.merchantName = localStorage.getItem('merchantName') || 'Merchant';

    const merchantId = localStorage.getItem('merchantId');
    if (!merchantId) return;

    // Fetch transactions
    this.txnService.getMerchantTransactions(+merchantId).subscribe({
      next: (data) => {
        this.recentTransactions = data;

        // Dynamic total transactions
        this.totalTransactions = data.length;

        // Dynamic total revenue
        this.totalRevenue = data.reduce((sum, txn) => sum + txn.totalAmount, 0);
      },
      error: (err) => console.error('Error fetching transactions:', err)
    });

    // Fetch total products for the merchant
    this.http.get<any[]>(`http://localhost:8085/payeasy-mercprodserv/api/products/merchant/${merchantId}`)
      .subscribe({
        next: (products) => {
          this.totalProducts = products.length;
        },
        error: (err) => console.error('Error fetching products:', err)
      });
  }
}
