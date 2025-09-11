import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MerchantAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const merchantId = localStorage.getItem('merchantId');
    //Just for debugging added this ~K/G
  // console.log('MerchantAuthGuard checking merchantId:', merchantId);
    if (merchantId) {
      return true; // Allow route access
    } else {
      // Redirect to merchant login if not logged in
      this.router.navigate(['/merchant/login']);
      return false;
    }
  }
}
