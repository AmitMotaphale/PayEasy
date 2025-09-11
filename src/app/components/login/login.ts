import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class Login {
  email = '';
  password = '';
  userType: 'user' | 'business' = 'user';
  error = '';
  // OTP state
  otpSent = false;
  otp = '';
  otpError = '';
  constructor(private router: Router, private auth: Auth) {}
  login(event?: Event) {
  if (event) event.preventDefault();
  this.error = '';
  this.otpError = '';
  this.otpSent = false;

  if (this.userType === 'business') {
    // call merchant login method
    this.auth.loginMerch(this.email, this.password).subscribe({
      next: (res) => {
        if (res !== 'Login successful') {
          this.error = 'Invalid credentials';
          return;
        }
        // Successful merchant login, no OTP, navigate to business home
        this.router.navigate(['/business/home'], { state: { email: this.email } })
          .catch(err => console.error('Navigation error:', err));
      },
      error: (err) => {
        console.error('Merchant login error:', err);
        this.error = err?.error || 'Invalid credentials or server error';
      }
    });
  } else {
    // existing user login flow with OTP
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res.ok === false) {
          this.error = res.message || 'Invalid credentials';
          return;
        }
        // Navigate to OTP verify page
        this.router.navigate(['/otp-verify'], { state: { email: this.email } })
          .catch(err => console.error('Navigation error:', err));
        this.otpSent = true;
        alert('OTP sent successfully. Please enter it below.');
      },
      error: (err) => {
        console.error('User login error', err);
        this.error = err?.error?.message || err.statusText || 'Invalid credentials or server error';
      }
    });
  }
}
  verifyOtp() {
    this.otpError = '';
    if (this.otp.length !== 6) {
      this.otpError = 'OTP must be 6 digits';
      return;
    }
    this.auth.verifyOtp(this.email, this.otp).subscribe({
      next: () => {
        this.otpError = '';
        this.error = '';
        this.otpSent = false; // hide OTP input on success
        // Redirect to business user home page
        this.router.navigate(['/business/home']);
      },
      error: (err) => {
        this.otpError = 'Invalid OTP, please try again.';
        console.error('OTP verification failed:', err);
      },
    });
  }
}