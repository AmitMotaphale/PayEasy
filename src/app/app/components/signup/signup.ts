import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../services/auth';
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
    const data = {
      fullName:this.fullName,
      email: this.email,
      mobile: this.mobile,
      passwordHash: this.passwordHash,
      userType: this.userType
    };
    this.auth.register(data).subscribe({
      next: (res) => {
        console.log('User registered', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'Registration failed. Please try again.';
        console.error('Signup error', err);
      }
    });
  }
}