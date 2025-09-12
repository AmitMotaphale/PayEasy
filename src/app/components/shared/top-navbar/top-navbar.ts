import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.html',
  imports : [FormsModule , CommonModule],
  standalone: true,
  styleUrls: ['./top-navbar.css']
})
export class TopNavbarComponent {
  dropdownOpen = false;

  constructor(private eRef: ElementRef, private router: Router) {}


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  editProfile() {
    this.router.navigate(['/merchant/dashboard/settings'], {
      state: { fromTopNavbar: true }
    });
  }

  logout() {
    localStorage.clear();
    window.location.href="/merchant/login";
  }
 @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.dropdownOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}