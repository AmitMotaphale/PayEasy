import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule,NgIf,CommonModule],
})
export class Login {
  email = '';
  password = '';
  userType:'user' | 'business' = 'user';
  error=''

  constructor(private router: Router) {}

  login() {
    // This is dummy logic; replace with real auth
    if (this.email === 'amit' && this.password === '123' && this.userType === 'user') {
      this.router.navigate(['/user/home']);
    } else if (this.email === 'amitb' && this.password === '123' && this.userType === 'business') {
      this.router.navigate(['/business/home']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}