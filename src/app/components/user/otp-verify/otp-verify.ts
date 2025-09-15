import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-otp-verify',
  standalone: true,
  template: `
  <div class="otp-container">
    <img src="Logo-text.png" alt="Logo" class="otp-logo" />
    <h3>Enter OTP sent to your email</h3>
    <div *ngIf="otpError" class="alert alert-danger">{{ otpError }}</div>
    <input [(ngModel)]="otp" name="otp" maxlength="6" minlength="6" required placeholder="6-digit OTP" class="form-control otp-input" />
    <button (click)="verifyOtp()" class="btn btn-success otp-verify-btn">Verify OTP</button>
    <div *ngIf="verified" class="alert alert-success">OTP verified successfully! Redirecting...</div>
  </div>
  `,
  styles: [`
  .otp-container {
    max-width: 400px;
    margin: 80px auto;
    padding: 40px 30px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    background-color: #fff;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .otp-logo {
    width: 120px;
    margin-bottom: 25px;
  }

  h3 {
    font-size: 20px;
    margin-bottom: 20px;
    color: #333;
  }

  .form-control.otp-input {
    width: 100%;
    max-width: 250px;
    margin: 0 auto 20px;
    padding: 12px;
    font-size: 18px;
    border: 1px solid #ccc;
    border-radius: 6px;
    text-align: center;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  .form-control.otp-input:focus {
    border-color: #28a745;
    box-shadow: 0 0 6px rgba(40, 167, 69, 0.2);
    outline: none;
  }

  .otp-verify-btn {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 6px;
    transition: background-color 0.3s;
    cursor: pointer;
  }

  .otp-verify-btn:hover {
    background-color: #218838;
  }

  .alert {
    margin-bottom: 15px;
    padding: 12px;
    border-radius: 5px;
    font-size: 14px;
  }

  .alert-danger {
    background-color: #f8d7da;
    color: #721c24;
  }

  .alert-success {
    background-color: #d4edda;
    color: #155724;
    margin-top: 15px;
  }
  @media (max-width: 500px) {
    .otp-container {
      margin: 50px 20px;
      padding: 30px 20px;
    }

    .form-control.otp-input {
      font-size: 16px;
    }

    .otp-verify-btn {
      font-size: 15px;
    }
  }
`],
  imports: [FormsModule ,CommonModule],
})
export class OtpVerify {
  otp = '';
  otpError = '';
  verified = false;
  email = '';
  constructor(private router: Router, private auth: Auth) {
    // Get email passed from login page (can be via state or localStorage)
    const navState = this.router.getCurrentNavigation()?.extras.state;
    this.email = navState?.['email'] || '';
    if (!this.email) {
      // If no email, redirect to login
      this.router.navigate(['/login']);
    }
  }
  verifyOtp() {
    if (this.otp.length !== 6) {
      this.otpError = 'OTP must be 6 digits';
      return;
    }
    this.auth.verifyOtp(this.email, this.otp).subscribe({
      next: () => {
        this.otpError = '';
        this.verified = true;
        setTimeout(() => this.router.navigate(['/user/home']), 1500);
      },
      error: (err) => {
        this.otpError = 'Invalid OTP, please try again.';
        console.error('OTP verification failed:', err);
      },
    });
  }
}