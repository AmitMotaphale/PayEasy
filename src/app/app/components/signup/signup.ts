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
  userType = 'user';

  constructor(private router: Router) {}

  onSignup() {
    // TODO: Implement signup logic here
    if(this.name && this.email && this.password){
      this.router.navigate(['/home']);
    }
  }
}