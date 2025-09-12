import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-merchant-signup',
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class MerchantSignupComponent {
  merchantName = '';
  contactNumber = '';
  email = '';
  password = '';
  error = '';

  constructor(private router: Router, private auth: Auth) { }

  signup() {
    const merchantData = {
      merchantName: this.merchantName,
      contactNumber: this.contactNumber,
      email: this.email,
      password: this.password
    };
    this.auth.registerMerch(merchantData).subscribe({
      next: (res) => {
        console.log('Merchant registered', res);
        this.router.navigate(['/merchant/login']);
      },
      error: (err) => {
        this.error = 'Merchant registration failed. Please try again.';
        console.error('Merchant signup error', err);
      }
    });
  }
}
