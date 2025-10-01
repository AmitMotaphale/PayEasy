// src/app/transactions/transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  transactionId: number;
  productId: number;
  merchantId: number;
  userId: number;
  userName: string;
  userEmail: string;
  quantityBought: number;
  totalAmount: number;
  createdAt: string;
  status: string; // add this if backend includes status, else we can set it manually
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8085/payeasy-mercprodserv/api/transactions';

  constructor(private http: HttpClient) {}

  // fetch transactions for a given user
  getUserTransactions(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/user/${userId}`);
  }

  // fetch transactions for a given merchant
  getMerchantTransactions(merchantId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/merchant/${merchantId}`);
  }
  
  buyProductTransaction(transactionData: {
  userId: number;
  userName: string;
  userEmail: string;
  productId: number;
  quantity: number;
  merchantId?: number;
}): Observable<Transaction> {
  return this.http.post<Transaction>(`${this.baseUrl}/buy`, transactionData);
}
}
