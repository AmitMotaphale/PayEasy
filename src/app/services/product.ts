import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from 'express';

export interface Product {
  productId?: number;
  merchantId: number;
  productName: string;
  description?: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8085/payeasy-mercprodserv/api/products';

  constructor(private http: HttpClient) {}

  getProductsByMerchant(merchantId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/merchant/${merchantId}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${productId}`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productId}`, { responseType: 'text'});
  }
}
