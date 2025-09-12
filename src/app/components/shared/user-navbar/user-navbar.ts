import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  templateUrl: './user-navbar.html',
  styleUrls: ['./user-navbar.css']
})
export class UserNavbar {
  dropdownOpen = false;

@Output() menuChange = new EventEmitter<string>(); 

  constructor(private router: Router) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/user/login');
  }
  // Call this on link click
  selectMenu(menu: string) {
    this.menuChange.emit(menu);
  }
}
