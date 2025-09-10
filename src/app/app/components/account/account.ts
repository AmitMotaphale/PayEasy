import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface BankAccount {
  id?: number;
  accountNumber: string;
  accountType: string;
  balance: number;
  bankName: string;
  isPrimary: boolean;
}

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.html',
  styleUrls: ['./account.css'],
  imports: [CommonModule,ReactiveFormsModule],
})
export class AccountComponent {
  accountForm: FormGroup;
  accounts: BankAccount[] = [];
  selectedAccount: BankAccount | null = null;
  userId: number = 1; // Assume logged-in user's ID for now
  showForm = false;

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]],
      bankName: ['', Validators.required],
    });
  }

  openForm(account?: BankAccount) {
    this.showForm = true;
    if (account) {
      this.selectedAccount = account;
      this.accountForm.patchValue(account);
    } else {
      this.selectedAccount = null;
      this.accountForm.reset();
    }
  }

  closeForm() {
    this.showForm = false;
    this.accountForm.reset();
  }

  saveAccount() {
    const formValue = this.accountForm.value;

    if (this.selectedAccount) {
      // Edit (simulate update)
      this.selectedAccount = { ...this.selectedAccount, ...formValue };
    } else {
      // Add new (simulate add)
      const newAccount: BankAccount = {
        id: Date.now(),
        ...formValue,
        isPrimary: false,
      };
      this.accounts.push(newAccount);
    }

    this.closeForm();
  }

  deleteAccount(accountId: number) {
    this.accounts = this.accounts.filter(acc => acc.id !== accountId);
  }

  setPrimary(accountId: number) {
    this.accounts.forEach(acc => acc.isPrimary = acc.id === accountId);
  }
}
