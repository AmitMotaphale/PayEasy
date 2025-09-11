// src/app/business/business.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product { id: number; name: string; price: number; description?: string; }
export interface BankAccount { id: number; name: string; number: string; balance: number; }
export interface Merchant { name: string; email: string; address: string; }

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private products$ = new BehaviorSubject<Product[]>([
    { id: 1, name: 'Premium Plan', price: 1999, description: 'Monthly subscription' },
    { id: 2, name: 'One-time Setup', price: 4999, description: 'Initial onboarding fee' }
  ]);

  private accounts$ = new BehaviorSubject<BankAccount[]>([
    { id: 1, name: 'Primary Settlement', number: 'XXXX-1234', balance: 125000 },
    { id: 2, name: 'Savings', number: 'XXXX-5678', balance: 50000 }
  ]);

  private merchant$ = new BehaviorSubject<Merchant>({
    name: 'Acme Corp',
    email: 'hello@acme.example',
    address: '12 Business Rd, City'
  });

  // PRODUCTS
  getProducts(): Observable<Product[]> { return this.products$.asObservable(); }
  addProduct(p: Omit<Product, 'id'>) {
    const list = this.products$.getValue();
    const id = list.length ? Math.max(...list.map(x => x.id)) + 1 : 1;
    this.products$.next([{ id, ...p }, ...list]);
  }
  updateProduct(p: Product) {
    const list = this.products$.getValue().map(x => x.id === p.id ? p : x);
    this.products$.next(list);
  }
  deleteProduct(id: number) {
    this.products$.next(this.products$.getValue().filter(x => x.id !== id));
  }

  // ACCOUNTS
  getAccounts(): Observable<BankAccount[]> { return this.accounts$.asObservable(); }
  addAccount(a: Omit<BankAccount, 'id'>) {
    const list = this.accounts$.getValue();
    const id = list.length ? Math.max(...list.map(x => x.id)) + 1 : 1;
    this.accounts$.next([{ id, ...a }, ...list]);
  }
  updateAccount(a: BankAccount) {
    this.accounts$.next(this.accounts$.getValue().map(x => x.id === a.id ? a : x));
  }
  deleteAccount(id: number) {
    this.accounts$.next(this.accounts$.getValue().filter(x => x.id !== id));
  }

  // MERCHANT
  getMerchant(): Observable<Merchant> { return this.merchant$.asObservable(); }
  saveMerchant(m: Merchant) { this.merchant$.next(m); }
  deleteMerchant() { this.merchant$.next({ name: '', email: '', address: '' }); }

  // helpers
  totalBalance(): Observable<number> {
    return this.getAccounts().pipe(map(list => list.reduce((s, a) => s + (a.balance || 0), 0)));
  }
}