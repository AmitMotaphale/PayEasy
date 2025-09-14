import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit {

  showCookiePopup: boolean = false;

  ngOnInit() {
    // Check if the user has already accepted cookies
    const accepted = localStorage.getItem('cookieAccepted');
    this.showCookiePopup = !accepted; // show popup only if not accepted
  }

  closeCookiePopup() {
    this.showCookiePopup = false;
    localStorage.setItem('cookieAccepted', 'true'); // save preference
  }
}