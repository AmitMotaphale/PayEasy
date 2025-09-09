// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.html',
//   styleUrls: ['./home.css']
// })
// export class HomeComponent {
//   // You can add properties or methods here if needed later
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from "../../../app-routing-module";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: true,
  styleUrls: ['./home.css'],
  imports: [AppRoutingModule]
})
export class HomeComponent {
  userName: string = 'John Doe';
  profileMenuVisible: boolean = false;

  constructor(private router: Router) {}

  toggleProfileMenu() {
    this.profileMenuVisible = !this.profileMenuVisible;
  }

  goToWallet() {
    this.profileMenuVisible = false;
    this.router.navigate(['/wallet']);
  }

  goToProfile() {
    this.profileMenuVisible = false;
    this.router.navigate(['/profile']);
  }

  logout() {
    this.profileMenuVisible = false;
    // You can clear session/local storage here
    this.router.navigate(['/login']);
  }
}
