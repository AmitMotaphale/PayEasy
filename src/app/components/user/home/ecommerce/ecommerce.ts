import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../../services/product';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-ecommerce',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ecommerce.html',
  styleUrls: ['./ecommerce.css']
})
export class ProductEcommerceComponents implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: CartItem[] = [];
  searchQuery: string = '';
  showCart: boolean = false;

  // Checkout modal state
  checkoutOpen = false;
  selectedProduct: any = null;
  paymentMethod: 'account' | 'wallet' = 'account';
  showSuccess = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCartFromStorage();
  }

  // Load all products
  loadProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  // Search filter
  searchProducts() {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.productName.toLowerCase().includes(query)
    );
  }

  // --- CART HANDLING ---
  addToCart(product: Product) {
    const existingItem = this.cart.find(item => item.product.productId === product.productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.saveCartToStorage();
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.saveCartToStorage();
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeFromCart(item);
    }
    this.saveCartToStorage();
  }

  removeFromCart(item: CartItem) {
    this.cart = this.cart.filter(c => c !== item);
    this.saveCartToStorage();
  }

  get cartCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  loadCartFromStorage() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cart = JSON.parse(saved);
    }
  }

  // --- CHECKOUT HANDLING ---
  openCheckout(product?: Product) {
    if (product) {
      // Buy Now
      this.selectedProduct = product;
    } else {
      // Cart Checkout
      this.selectedProduct = { productName: 'Cart Items', price: this.cartTotal };
    }
    this.checkoutOpen = true;
    this.showSuccess = false;
    this.paymentMethod = 'account';
  }

  closeCheckout() {
    this.checkoutOpen = false;
    this.selectedProduct = null;
    this.paymentMethod = 'account';
    this.showSuccess = false;
  }

  payNow() {
    // TODO: integrate with backend payment service
    this.showSuccess = true;

    // Auto-close after 2 seconds
    setTimeout(() => {
      this.closeCheckout();
    }, 2000);
  }
}
