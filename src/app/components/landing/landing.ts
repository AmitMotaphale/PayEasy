import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  showCookiePopup: boolean = false;

  ngOnInit() {
    //this isPlatformBrowser is necessary as cookies is directly sending request to access localstorage without checking the Browser details ~KG
    if (isPlatformBrowser(this.platformId)) {
    // Check if the user has already accepted cookies
    const accepted = localStorage.getItem('cookieAccepted');
    this.showCookiePopup = !accepted; // show popup only if not accepted
  }
  }

  closeCookiePopup() {
    this.showCookiePopup = false;
    localStorage.setItem('cookieAccepted', 'true'); // save preference
}
}