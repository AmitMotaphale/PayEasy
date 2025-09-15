import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Userbank, BankAccount } from '../../../../services/userbank';

interface BackendTransaction {
  txnId: number;
  userId: number;
  walletId: number;
  bankId?: number;
  merchantId?: number;
  txnType: string;
  amount: number;
  status: string;
  description?: string;
  createdAt: string;
}


@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './wallet.html',
  styleUrls: ['./wallet.css']
})
export class WalletComponent implements OnInit {
  walletBalance: number = 0;
  addAmount: number = 0;
  selectedBank: number | null = null;
  bankAccounts: BankAccount[] = [];
  transactions: BackendTransaction[] = [];
  showConfirm = false;
  showSuccess = false;
  private userId: number = Number(localStorage.getItem('userId'));
  private walletBaseUrl = 'http://localhost:8085/payeasy-paymentserv/api/wallets';

  constructor(private http: HttpClient, private userbank: Userbank) {}

  ngOnInit() {
    this.loadWallet();
    this.loadBankAccounts();
    this.loadTransactions();
  }

  loadWallet() {
    this.http.get<{ walletId: number; userId: number; balance: number }>(`${this.walletBaseUrl}/user/${this.userId}`)
      .subscribe({
        next: (res) => this.walletBalance = res.balance,
        error: (err) => console.error('Error fetching wallet', err)
      });
  }

  loadBankAccounts() {
    this.userbank.getBankAccountsByUser(this.userId).subscribe({
      next: (res) => this.bankAccounts = res,
      error: (err) => console.error('Error fetching bank accounts', err)
    });
  }

  loadTransactions() {
  this.http.get<BackendTransaction[]>(`http://localhost:8085/payeasy-paymentserv/api/transactions/user/${this.userId}`)
    .subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.transactions = res;
        } else {
          console.error('Transactions API did not return an array', res);
          this.transactions = [];
        }
      },
      error: (err) => console.error('Error fetching transactions', err)
    });
}


  openConfirmDialog() {
    if (this.addAmount > 0 && this.selectedBank) {
      this.showConfirm = true;
    }
  }

  confirmAddMoney() {
    if (!this.selectedBank) return;
    const payload = {
      amount: this.addAmount,
      bankId: this.selectedBank
    };
    this.http.post<any>(`${this.walletBaseUrl}/user/${this.userId}/add`, payload).subscribe({
      next: (res) => {
        this.loadWallet();
        this.loadTransactions();
        this.addAmount = 0;
        this.selectedBank = null;
        this.showConfirm = false;
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 2000);
      },
      error: (err) => {
        console.error('Error adding funds', err);
        this.showConfirm = false;
      }
    });
  }

  cancelAddMoney() {
    this.showConfirm = false;
  }

  getBankName(bankId: number | null): string {
    if (!bankId) return '';
    const bank = this.bankAccounts.find(b => b.bankId === bankId);
    return bank ? bank.bankName : '';
  }
}
