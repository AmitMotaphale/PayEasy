import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantLoginResponse } from '../components/merchant/login/login';
@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl='http://localhost:8085';constructor(private http: HttpClient) {}
  // Separate login URLs per userType handled in frontend routing, so only pass email,password here
loginUser(email: string, password: string): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/payeasy-userserv/api/users/login`,
    { email, password },
    { responseType: 'text' }  // tell Angular to expect response as plain text
  );
}
// OTP verify endpoint on different service
verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`http://localhost:8086/otp/verify`, { email, otp },{ headers: { 'Content-Type': 'application/json' } ,responseType: 'text' });
  }
registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/payeasy-userserv/api/users/register`, data);
  }

loginMerch(email: string, password: string): Observable<MerchantLoginResponse> {
  return this.http.post<MerchantLoginResponse>(
    `${this.baseUrl}/payeasy-mercprodserv/api/merchants/login`,
    { email, password }
  );
}

registerMerch(merchantData: any): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/payeasy-mercprodserv/api/merchants/register`,
    merchantData
  );
}
}