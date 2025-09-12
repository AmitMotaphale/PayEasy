import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './signup.html',
  styleUrl: './signup.css', // use your signup.css path
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class UserSignupComponent {
  fullName = '';
  email = '';
  mobile = '';
  passwordHash = '';
  error = '';

  constructor(private router: Router, private auth: Auth) { }

  signup() {
    const userData = {
      fullName: this.fullName,
      email: this.email,
      mobile: this.mobile,
      passwordHash: this.passwordHash,
      userType: 'user'
    };
    this.auth.registerUser(userData).subscribe({
      next: (res) => {
        console.log('User registered', res);
        this.router.navigate(['/user/login']);
      },
      error: (err) => {
        this.error = 'User registration failed. Please try again.';
        console.error('User signup error', err);
      }
    });
  }
}
