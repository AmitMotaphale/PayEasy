import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wallet.html',
  styleUrls: ['./wallet.css']
})
export class WalletComponent {
  walletBalance = 1250.75;
  addAmount: number = 0;
  selectedBank = '';
  bankAccounts = ['HDFC - 2451', 'SBI - 3432', 'ICICI - 9991'];

  showConfirm = false;
  showSuccess = false;

  transactions = [
    { date: '2025-09-10', type: 'Added', amount: 500 },
    { date: '2025-09-08', type: 'Paid', amount: -250 },
    { date: '2025-09-05', type: 'Added', amount: 1000 },
  ];

  // Step 1: Trigger confirmation dialog
  requestAddMoney() {
    if (this.addAmount > 0 && this.selectedBank) {
      this.showConfirm = true;
    }
  }

  openConfirmDialog() {
    if (this.addAmount > 0 && this.selectedBank) {
      this.showConfirm = true;
    }
  }

  // Step 2: User confirms adding money
  confirmAddMoney() {
    this.walletBalance += this.addAmount;
    this.transactions.unshift({
      date: new Date().toISOString().split('T')[0],
      type: 'Added',
      amount: this.addAmount,
    });

    // Reset input fields
    this.addAmount = 0;
    this.selectedBank = '';

    // Close confirm, show success
    this.showConfirm = false;
    this.showSuccess = true;

    // Auto-close success after 2 seconds
    setTimeout(() => {
      this.showSuccess = false;
    }, 2000);
  }

  // Optional: cancel confirm dialog
  cancelAddMoney() {
    this.showConfirm = false;
  }
}
