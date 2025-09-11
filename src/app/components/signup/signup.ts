import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class Signup {
  fullName='';
  email = '';
  mobile='';
  passwordHash = '';
  userType: 'user' | 'business' = 'user';
  error='';
  constructor(private router: Router, private auth: Auth) {}
signup() {
  if (this.userType === 'business') {
    const merchantData = {
      merchantName: this.fullName, // Assuming fullName maps to merchantName
      contactNumber: this.mobile,
      email: this.email,
      password: this.passwordHash
    };
    this.auth.registerMerch(merchantData).subscribe({
      next: (res) => {
        console.log('Merchant registered', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'Merchant registration failed. Please try again.';
        console.error('Merchant signup error', err);
      }
    });
  } else {
    const userData = {
      fullName: this.fullName,
      email: this.email,
      mobile: this.mobile,
      passwordHash: this.passwordHash,
      userType: this.userType
    };
    this.auth.register(userData).subscribe({
      next: (res) => {
        console.log('User registered', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'User registration failed. Please try again.';
        console.error('User signup error', err);
        }
      });
    }
  }
}