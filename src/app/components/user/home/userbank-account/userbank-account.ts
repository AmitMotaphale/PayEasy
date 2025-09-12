import { Component } from '@angular/core';
import { BankAccount, Userbank } from '../../../../services/userbank';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userbank-account',
  imports: [CommonModule,FormsModule],
  templateUrl: './userbank-account.html',
  styleUrl: './userbank-account.css'
})
export class UserbankAccountComponent {
bankAccounts: BankAccount[] = [];
  newAccount: BankAccount = {
    userId: 0,  // set current user id after authentication
    accountNumber: '',
    bankName: '',
    ifscCode: '',
  };

  constructor(private userbank: Userbank) {}

  ngOnInit() {
  const userIdString = localStorage.getItem('userId');
  if (userIdString) {
    const userId = Number(userIdString);
    this.newAccount.userId = userId; // if your entity still uses userId, change to userId in BankAccount interface
    this.loadBankAccounts(userId);
  } else {
    console.error('User ID not found in localStorage');
    // Optionally redirect to login or show error message
  }
}


loadBankAccounts(userId: number) {
  this.userbank.getBankAccountsByUser(userId).subscribe({
    next: (accounts) => (this.bankAccounts = accounts),
    error: (err) => console.error('Error loading bank accounts', err),
  });
}


  addBankAccount(event: Event) {
    event.preventDefault();

    if (
      this.newAccount.accountNumber.length < 10 ||
      this.newAccount.accountNumber.length > 20 ||
      this.newAccount.bankName.trim().length === 0 ||
      this.newAccount.ifscCode.length !== 11
    ) {
      alert('Please enter valid bank account details.');
      return;
    }

    this.userbank.addBankAccount(this.newAccount).subscribe({
      next: (savedAccount) => {
        this.bankAccounts.push(savedAccount);
        this.newAccount = { userId: this.newAccount.userId, accountNumber: '', bankName: '', ifscCode: '' };
      },
      error: (err) => console.error('Error adding bank account', err),
    });
  }

  deleteBankAccount(bankId: number) {
  if (confirm('Are you sure you want to delete this bank account?')) {
    this.userbank.deleteBankAccount(bankId).subscribe({
      next: () => this.bankAccounts = this.bankAccounts.filter(acc => acc.bankId !== bankId),
      error: (err) => console.error('Error deleting bank account', err),
    });
  }
}

saveBankAccount(account: BankAccount) {
  if (
    account.accountNumber.length < 10 ||
    account.accountNumber.length > 20 ||
    account.bankName.trim().length === 0 ||
    account.ifscCode.length !== 11
  ) {
    alert('Please enter valid bank account details.');
    return;
  }

  this.userbank.updateBankAccount(account.bankId!, account).subscribe({
    next: (updatedAccount) => {
      const index = this.bankAccounts.findIndex(acc => acc.bankId === updatedAccount.bankId);
      if (index !== -1) {
        this.bankAccounts[index] = updatedAccount;
        this.bankAccounts[index].editMode = false; // exit edit mode
      }
    },
    error: (err) => {
      console.error('Error updating bank account', err);
      alert('Failed to update bank account');
    }
  });
}

togglePrimary(account: BankAccount) {
  this.userbank.setPrimaryBankAccount(account.userId, account.bankId!).subscribe({
    next: () => {
      // Update local array to set only one primary account
      this.bankAccounts.forEach(acc => acc.isPrimary = (acc.bankId === account.bankId));
    },
    error: (err) => {
      console.error('Failed to set primary bank account', err);
      alert('Could not change primary bank account');
    }
  });
}
confirmTogglePrimary(account: any, event: Event) {
  const confirmed = window.confirm('Do you want to change the primary bank account?');
  if (confirmed) {
    this.togglePrimary(account);
  } else {
    event.preventDefault();
    setTimeout(() => {
      account.isPrimary = !account.isPrimary;
    });
  }
}
}

