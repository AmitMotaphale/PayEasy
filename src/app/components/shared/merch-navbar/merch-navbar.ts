import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-merch-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merch-navbar.html',
  styleUrl: './merch-navbar.css'
})
export class MerchNavbar {
  isCollapsed = true;
  activeMenu = 'overview';

  @Output() menuChange = new EventEmitter<string>();

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  selectMenu(menu: string) {
    this.activeMenu = menu;
    this.menuChange.emit(menu);
  }

  logout() {
    // Clear all stored user data on logout
    localStorage.clear();
    // Navigate to merchant login page
    this.router.navigate(['/merchant/login']).catch(err => console.error('Navigation error:', err));
  }
}
