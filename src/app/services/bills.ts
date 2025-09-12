import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bill {
  billId?: number;
  userId: number;
  userName?: string;
  billType: string;
  customerId: string;
  amount: number;
  status?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  private baseUrl = 'http://localhost:8085/payeasy-billserv/api/bills'; // your backend URL

  constructor(private http: HttpClient) {}

  // Create new bill
  createBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.baseUrl, bill);
  }

  // Get all bills for a user
  getBillsByUser(userId: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.baseUrl}/user/${userId}`);
  }

  // Pay a bill
  payBill(billId: number): Observable<Bill> {
    return this.http.put<Bill>(`${this.baseUrl}/${billId}/pay`, {});
  }
}
