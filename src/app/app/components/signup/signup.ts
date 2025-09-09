import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  standalone: true,
  imports: [FormsModule]
})
export class Signup {
  name = '';
  email = '';
  password = '';
  userType: 'user' | 'business' = 'user';

  constructor(private router: Router) {}

  signup() {
    // Save to API or localStorage if needed
    console.log(`Signed up: ${this.email} as ${this.userType}`);
    this.router.navigate(['/login']);
  }
}