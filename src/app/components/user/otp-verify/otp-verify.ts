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
    <img src="assets/logo.png" alt="Logo" class="otp-logo" />
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
      margin: 100px auto;
      text-align: center;
      padding: 30px;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 0 15px rgba(0,0,0,0.1);
    }
    .otp-logo {
      width: 100px;
      margin-bottom: 20px;
    }
    .otp-input {
      margin-bottom: 15px;
      font-size: 18px;
      text-align: center;
    }
    .otp-verify-btn {
      width: 100%;
      font-size: 16px;
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