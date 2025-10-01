import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface UserLoginResponse {
  userId: number;
  fullName: string;
  email: string;
  mobile: string;
  message: string;
}

@Component({
  selector: 'app-user-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'], // use your login.css path
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class UserLoginComponent {
  email = '';
  password = '';
  error = '';
  otpSent = false;
  otp = '';
  otpError = '';

  constructor(private router: Router, private auth: Auth) { }

  login(event?: Event) {
    if (event) event.preventDefault();
    this.error = '';
    this.otpError = '';
    this.otpSent = false;

    this.auth.loginUser(this.email, this.password).subscribe({
      next: (res: UserLoginResponse) => {
        if (res.userId !== undefined && res.fullName && res.email && res.mobile) {
          localStorage.setItem('userId', res.userId.toString());
          localStorage.setItem('fullName', res.fullName);
          localStorage.setItem('email', res.email);
          // Keep duplicate keys for compatibility across components using different keys
          localStorage.setItem('userName', res.fullName);
          localStorage.setItem('userEmail', res.email);
          localStorage.setItem('mobile', res.mobile.toString());
        }
        else {
          console.error('Invalid user data received:', res);
        }
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
        this.otpSent = false;
        this.router.navigate(['/user/home']);
      },
      error: (err) => {
        this.otpError = 'Invalid OTP, please try again.';
        console.error('OTP verification failed:', err);
      },
    });
  }
}
