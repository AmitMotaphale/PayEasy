import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BankAccount {
  bankId?: number;
  userId: number;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  isPrimary?: boolean;
  createdAt?: string;

  editMode?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Userbank {
  private baseUrl = 'http://localhost:8085/payeasy-bankaccserv/api/userbankaccounts';

  constructor(private http: HttpClient) {}

  getBankAccountsByUser(userId: number): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${this.baseUrl}/user/${userId}`);
  }

  addBankAccount(bankAccount: BankAccount): Observable<BankAccount> {
    return this.http.post<BankAccount>(this.baseUrl, bankAccount);
  }

  updateBankAccount(bankId: number, bankAccount: BankAccount): Observable<BankAccount> {
    return this.http.put<BankAccount>(`${this.baseUrl}/${bankId}`, bankAccount);
  }

  deleteBankAccount(bankId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${bankId}`, { responseType: 'text'});
  }

  setPrimaryBankAccount(userId: number, bankId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${userId}/primary/${bankId}`, null,{ responseType: 'text' });
  }
}
