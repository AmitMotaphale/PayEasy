import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import {FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.html',
  imports : [FormsModule , CommonModule],
  standalone: true,
  styleUrls: ['./top-navbar.css']
})
export class TopNavbarComponent {
  dropdownOpen = false;

  constructor(private eRef: ElementRef) {}


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  editProfile() {
    console.log('Edit profile clicked');
    // navigate to profile page
  }

  logout() {
    console.log('Logout clicked');
    // handle logout logic
  }
 @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.dropdownOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}