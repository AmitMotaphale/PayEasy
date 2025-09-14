import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Wallet {
  walletId: number;
  userId: number;
  balance: number;
  lastUpdated: string;
}

@Injectable({ providedIn: 'root' })
export class WalletService {
  private baseUrl = 'http://localhost:8080/api/wallets'; // Adjust if needed
  private userId = 1; // Replace with actual user ID logic

  constructor(private http: HttpClient) {}

  getWallet(): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.baseUrl}/user/${this.userId}`);
  }

  getBalance(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/user/${this.userId}/balance`);
  }

  addMoney(amount: number): Observable<Wallet> {
    return this.http.put<Wallet>(
      `${this.baseUrl}/user/${this.userId}/add?amount=${amount}`, 
      {}
    );
  }

  deductMoney(amount: number): Observable<Wallet> {
    return this.http.put<Wallet>(
      `${this.baseUrl}/user/${this.userId}/deduct?amount=${amount}`, 
      {}
    );
  }
}
