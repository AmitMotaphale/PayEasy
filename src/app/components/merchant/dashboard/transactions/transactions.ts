// src/app/transactions/transactions.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService, Transaction } from '../../../../services/transactions';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
  imports: [CommonModule, FormsModule],
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];

  searchText: string = '';
  selectedStatus: string = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    // Example: fetch transactions for userId from localStorage
    const merchantId = localStorage.getItem('merchantId');
    if (merchantId) {
      this.transactionService.getMerchantTransactions(+merchantId).subscribe({
        next: (data) => {
          // if backend doesn’t provide status, you can assign it randomly/dynamically
          this.transactions = data.map((txn) => ({
            ...txn,
            status: txn.status || 'Success', // default if backend has no status
          }));
          this.filteredTransactions = [...this.transactions];
        },
        error: (err) => console.error('Error fetching transactions:', err),
      });
    }
  }

  applyFilter() {
    this.filteredTransactions = this.transactions.filter((txn) => {
      const matchesSearch =
        this.searchText === '' ||
        txn.productId.toString().includes(this.searchText) ||
        txn.transactionId.toString().includes(this.searchText) ||
        txn.userName.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.selectedStatus === '' || txn.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }
}
