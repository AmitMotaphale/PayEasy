import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule]
})
export class Login {
  email = '';
  password = '';
  userType = 'user';

  constructor(private router: Router) {}

  onLogin() {
    // TODO: Implement authentication logic here
    if(this.email && this.password){
      this.router.navigate(['/home']);
    }
  }
}