import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Transaction {
  id: string;
  product: string;
  purchasedBy: string;
  amount: number;
  date: string;
  status: string;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
  imports: [CommonModule, FormsModule],
})
export class TransactionsComponent {
  transactions: Transaction[] = [
    { id: '#T001', product: 'Product A', purchasedBy: 'Rahul Sharma', amount: 1500, date: '2025-09-10', status: 'Success' },
    { id: '#T002', product: 'Product B', purchasedBy: 'Anita Verma', amount: 2000, date: '2025-09-11', status: 'Pending' },
    { id: '#T003', product: 'Product C', purchasedBy: 'Suresh Kumar', amount: 750, date: '2025-09-12', status: 'Failed' },
    { id: '#T004', product: 'Product D', purchasedBy: 'Neha Singh', amount: 3200, date: '2025-09-12', status: 'Success' },
    { id: '#T005', product: 'Product E', purchasedBy: 'Amit Patel', amount: 1200, date: '2025-09-12', status: 'Pending' },
  ];

  filteredTransactions: Transaction[] = [...this.transactions];
  searchText: string = '';
  selectedStatus: string = '';

  applyFilter() {
    this.filteredTransactions = this.transactions.filter((txn) => {
      const matchesSearch =
        this.searchText === '' ||
        txn.product.toLowerCase().includes(this.searchText.toLowerCase()) ||
        txn.id.toLowerCase().includes(this.searchText.toLowerCase()) ||
        txn.purchasedBy.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.selectedStatus === '' || txn.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }
}
