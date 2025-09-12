import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface MerchantLoginResponse {
  merchantId: number;
  merchantName: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-merchant-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class MerchantLoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router, private auth: Auth) {}

  login(event?: Event) {
    if (event) event.preventDefault();
    this.error = '';

this.auth.loginMerch(this.email, this.password).subscribe({
  next: (res: MerchantLoginResponse) => {
    if (res.message !== 'Login successful') {
      this.error = 'Invalid credentials';
      return;
    }
    localStorage.setItem('merchantId', res.merchantId.toString());
    localStorage.setItem('merchantName', res.merchantName);
    localStorage.setItem('email', res.email);
    this.router.navigate(['/merchant/dashboard'], { state: { email: res.email } })
      .catch(err => console.error('Navigation error:', err));
  },
  error: (err) => {
    console.error('Merchant login error:', err);
    this.error = err?.error || 'Invalid credentials or server error';
  }
});

  }
}
