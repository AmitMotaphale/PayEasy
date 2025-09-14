import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './userhome.html',
  styleUrl: './userhome.css'
})
export class UserhomeComponent implements OnInit{
  constructor(private router: Router) {}
  showSendMoneyDialog = false;
  showSuccessDialog = false;

  // Sample bank accounts
  bankAccounts: string[] = [
    'XXXX-XXXX-1234 - HDFC Bank',
    'XXXX-XXXX-5678 - ICICI Bank',
    'XXXX-XXXX-9012 - SBI Bank'
  ];

  sendFormData = {
    name: '',
    accountNumber: '',
    ifsc: '',
    amount: 0,
    fromAccount: ''
  };

  // constructor() {}

  ngOnInit(): void {
    console.log('Userhome component initialized.');
  }

  openSendMoneyDialog() {
    this.showSendMoneyDialog = true;
  }

  closeSendMoneyDialog() {
    this.showSendMoneyDialog = false;
  }

  sendMoney() {
    if (
      this.sendFormData.name &&
      this.sendFormData.accountNumber &&
      this.sendFormData.ifsc &&
      this.sendFormData.amount > 0 &&
      this.sendFormData.fromAccount
    ) {
      this.showSendMoneyDialog = false;
      this.showSuccessDialog = true;

      // Reset the form
      this.sendFormData = {
        name: '',
        accountNumber: '',
        ifsc: '',
        amount: 0,
        fromAccount: ''
      };
    }
  }

  goToPayBills() {
    this.router.navigate(['/pay-bills']);
  }

  closeSuccessDialog() {
    this.showSuccessDialog = false;
  }
}