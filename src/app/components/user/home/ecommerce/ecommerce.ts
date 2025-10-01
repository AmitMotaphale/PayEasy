import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../../services/product';
import { TransactionService } from '../../../../services/transactions';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-ecommerce',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [TransactionService],
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

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService
  ) {}

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
    this.showSuccess = true;

    const userId = Number(localStorage.getItem('userId'));
    const userName = localStorage.getItem('userName') || localStorage.getItem('fullName') || 'Unknown';
    const userEmail = localStorage.getItem('userEmail') || localStorage.getItem('email') || 'unknown@example.com';

    if (this.selectedProduct?.productName === 'Cart Items') {
      // Directly create transactions for each cart item; backend will atomically reduce stock
      const txnRequests = this.cart.map(cartItem =>
        this.transactionService.buyProductTransaction({
          userId,
          userName,
          userEmail,
          productId: cartItem.product.productId!,
          quantity: cartItem.quantity,
          merchantId: cartItem.product.merchantId
        }).toPromise()
      );

      Promise.all(txnRequests)
        .then(() => {
          this.cart = [];
          this.saveCartToStorage();
          this.loadProducts(); // refresh product list
        })
        .catch(err => {
          console.error('Error creating transactions:', err);
        });

    } else if (this.selectedProduct) {
      // Single product purchase -> only create transaction; backend reduces stock
      this.transactionService.buyProductTransaction({
        userId,
        userName,
        userEmail,
        productId: this.selectedProduct.productId!,
        quantity: 1,
        merchantId: this.selectedProduct.merchantId
      }).subscribe({
        next: () => {
          console.log('Transaction logged.');
          this.loadProducts();
        },
        error: err => console.error('Error logging transaction:', err)
      });
    }

    setTimeout(() => this.closeCheckout(), 2000);
  }
}
