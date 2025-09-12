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
  activeMenu = 'report';

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
    const confirmed = window.confirm('Are you sure you want to logout?');

    if (confirmed) {
      localStorage.clear();
      this.router.navigate(['/merchant/login']).catch(err => console.error('Navigation error:', err));
    }
  }
}
