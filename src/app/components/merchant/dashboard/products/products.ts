import { Component } from '@angular/core';
import { Product ,ProductService} from '../../../../services/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
   imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent {
products: Product[] = [];
  merchantId!: number;

  newProduct: Product = {
    merchantId: 0,
    productName: '',
    description: '',
    price: 0,
  };

  editProductId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    const merchIdStr = localStorage.getItem('merchantId');
    if (merchIdStr) {
      this.merchantId = Number(merchIdStr);
      this.newProduct.merchantId = this.merchantId;
      this.loadProducts();
    } else {
      console.error('Merchant ID not found in localStorage');
      // Optionally redirect to login here
    }
  }

  loadProducts() {
    this.productService.getProductsByMerchant(this.merchantId).subscribe({
      next: (res) => (this.products = res),
      error: (err) => console.error('Failed to load products', err),
    });
  }

  addProduct() {
    if (!this.newProduct.productName.trim() || this.newProduct.price <= 0) {
      alert('Please enter valid product name and price.');
      return;
    }

    this.productService.addProduct(this.newProduct).subscribe({
      next: (res) => {
        this.products.push(res);
        this.resetForm();
      },
      error: (err) => console.error('Failed to add product', err),
    });
  }

  startEdit(product: Product) {
    this.editProductId = product.productId!;
    // Clone the product to avoid immediate binding changes
    this.newProduct = { ...product };
  }

  saveEdit() {
    if (this.editProductId === null) return;

    if (!this.newProduct.productName.trim() || this.newProduct.price <= 0) {
      alert('Please enter valid product name and price.');
      return;
    }

    this.productService.updateProduct(this.editProductId, this.newProduct).subscribe({
      next: (res) => {
        const index = this.products.findIndex(p => p.productId === res.productId);
        if (index !== -1) this.products[index] = res;
        this.editProductId = null;
        this.resetForm();
      },
      error: (err) => console.error('Failed to update product', err),
    });
  }

  cancelEdit() {
    this.editProductId = null;
    this.resetForm();
  }

  deleteProduct(productId: number) {
    if (!confirm('Are you sure to delete this product?')) return;

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.productId !== productId);
      },
      error: (err) => console.error('Failed to delete product', err),
    });
  }

  resetForm() {
    this.newProduct = {
      merchantId: this.merchantId,
      productName: '',
      description: '',
      price: 0,
    };
  }
}

