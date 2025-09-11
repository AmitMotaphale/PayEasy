import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-merchant',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './merchant.html',
  styleUrls: ['./merchant.css'],
})
export class MerchantComponent implements OnInit {
  searchTerm: string = '';
  showCart: boolean = false;

  products: Product[] = [];
  cartItems: CartItem[] = [];
  localStorageKey = 'cartItems';

  private API_BASE = 'http://localhost:8085/payeasy-mercprodserv/api'; 

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit() {
      this.loadProducts();

      if (isPlatformBrowser(this.platformId)) {
        this.loadCartFromLocalStorage();
  }
}

  // Fetch products from backend
  loadProducts() {
    this.http.get<Product[]>(`${this.API_BASE}/products`).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Failed to load products', err);
      },
    });
  }

  // Load cart from browser localStorage
  loadCartFromLocalStorage() {
    if (!isPlatformBrowser(this.platformId)) return;

    const storedCart = localStorage.getItem(this.localStorageKey);
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }

  // Save cart to localStorage
  saveCartToLocalStorage() {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  // Add product to cart
  addToCart(product: Product) {
    // console.log('Adding to cart:', product);
    // console.log('Current cart:', this.cartItems);
    const existing = this.cartItems.find(item => Number(item.id) === Number(product.id));
    // console.log(existing)
    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.saveCartToLocalStorage();
  }

  // Remove product from cart
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCartToLocalStorage();
  }

  trackById(index: number, item: Product | CartItem): number {
    return item.id;
  }

  // Increase quantity
  increaseQuantity(productId: number) {
    const item = this.cartItems.find(i => i.id === productId);
    if (item) {
      item.quantity++;
      this.saveCartToLocalStorage();
    }
  }

  // Decrease quantity (remove if goes to 0)
  decreaseQuantity(productId: number) {
    const item = this.cartItems.find(i => i.id === productId);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCartToLocalStorage();
      }
    }
  }

  // Get total cart price
  get totalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Toggle cart UI
  toggleCart() {
    this.showCart = !this.showCart;
  }

  // Search filtered products
  get filteredProducts(): Product[] {
    const term = this.searchTerm?.toLowerCase() || '';

    return this.products.filter((product) => {
      const name = product.name ? product.name.toLowerCase() : '';
      const desc = product.description ? product.description.toLowerCase() : '';
      return name.includes(term) || desc.includes(term);
    });
  }

  // Checkout
  checkout() {
    alert('Checkout Successful!');
    this.cartItems = [];
    this.saveCartToLocalStorage();
  }

  // Buy Now button
  buyNow(product: Product) {
    const existing = this.cartItems.find(item => item.id === product.id);
    if (!existing) {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.saveCartToLocalStorage();
    this.showCart = true;
    this.checkout();
  }
}
