import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userId = localStorage.getItem('userId');
    //Just for debugging added this ~K/G
  // console.log('MerchantAuthGuard checking merchantId:', merchantId);
    if (userId) {
      return true; // Allow route access
    } else {
      // Redirect to merchant login if not logged in
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
