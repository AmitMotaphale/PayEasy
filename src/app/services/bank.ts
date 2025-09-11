import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BankAccount {
  bankId?: number;
  merchId: number;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  isPrimary?: boolean;
  createdAt?: string;

  editMode?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private baseUrl = 'http://localhost:8085/payeasy-merchbankaccserv/api/merchbankaccounts';

  constructor(private http: HttpClient) {}

  getBankAccountsByUser(merchId: number): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${this.baseUrl}/merchant/${merchId}`);
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

  setPrimaryBankAccount(merchId: number, bankId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/merchant/${merchId}/primary/${bankId}`, null,{ responseType: 'text' });
  }
}
