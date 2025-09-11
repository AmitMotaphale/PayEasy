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
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { AppRoutingModule } from "../../../app-routing-module";

@Component({
  selector: 'app-home',
  templateUrl: './layout.html',
  standalone: true,
  styleUrls: ['./layout.css'],
  imports: [RouterModule, CommonModule]
})
export class LayoutComponent {
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

  goToTransactions() {
    this.profileMenuVisible = false;
    this.router.navigate(['/transactions']);
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
