import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Merchant {
  merchantId?: number;
  merchantName: string;
  contactNumber: string;
  email: string;
  password?: string; // optional for update
}

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private baseUrl = 'http://localhost:8085/payeasy-mercprodserv/api/merchants';

  constructor(private http: HttpClient) {}

  getMerchantById(merchantId: number): Observable<Merchant> {
    return this.http.get<Merchant>(`${this.baseUrl}/${merchantId}`);
  }

  updateMerchant(merchantId: number, merchant: Merchant): Observable<Merchant> {
    return this.http.put<Merchant>(`${this.baseUrl}/${merchantId}`, merchant);
  }

  deleteMerchant(merchantId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${merchantId}`,{ responseType: 'text'});
  }
}
