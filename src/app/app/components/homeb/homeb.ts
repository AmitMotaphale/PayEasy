
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormsModule,
  FormGroup
} from '@angular/forms';
import {
  BusinessService,
  Product,
  BankAccount,
  Merchant
} from './homeb.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-business-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './homeb.html',
  styleUrls: ['./homeb.css']
})
export class HomebComponent {
  userName = 'Business Owner';
  profileMenuVisible = false;
  section: 'home' | 'products' | 'accounts' | 'merchant' | 'transactions' =
    'home';

  products$: Observable<Product[]>;
  accounts$: Observable<BankAccount[]>;
  merchant$: Observable<Merchant>;
  totalBalance$: Observable<number>;

  productSearch = '';
  accountSearch = '';
  modalVisible = false;
  modalType: 'product' | 'account' | null = null;
  modalTitle = '';

  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private svc: BusinessService
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: [0],
      description: [''],
      number: [''],
      balance: [0]
    });

    this.products$ = this.svc.getProducts();
    this.accounts$ = this.svc.getAccounts();
    this.merchant$ = this.svc.getMerchant();
    this.totalBalance$ = this.svc.totalBalance();
  }

  goto(section: any) {
    this.section = section;
    this.closeModal();
  }

  toggleProfileMenu() {
    this.profileMenuVisible = !this.profileMenuVisible;
  }

  goToWallet() {
    this.profileMenuVisible = false;
    this.router.navigate(['/business/wallet']);
  }

  goToTransactions() {
    this.profileMenuVisible = false;
    this.section = 'transactions';
  }

  goToProfile() {
    this.profileMenuVisible = false;
    this.section = 'merchant';
  }

  logout() {
    this.profileMenuVisible = false;
    this.router.navigate(['/login']);
  }

  // PRODUCTS
  filteredProducts(products: Product[]) {
    const q = this.productSearch.trim().toLowerCase();
    return products.filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
    );
  }

  openCreateProduct() {
    this.modalType = 'product';
    this.modalTitle = 'Create Product';
    this.form.reset({
      id: null,
      name: '',
      price: 0,
      description: '',
      number: '',
      balance: 0
    });
    this.modalVisible = true;
  }

  openEditProduct(p: Product) {
    this.modalType = 'product';
    this.modalTitle = 'Edit Product';
    this.form.patchValue({
      id: p.id,
      name: p.name ?? '',
      price: p.price,
      description: p.description ?? '',
      number: '',
      balance: 0
    });
    this.modalVisible = true;
  }

  deleteProduct(id: number) {
    if (!confirm('Delete this product?')) return;
    this.svc.deleteProduct(id);
  }

  // ACCOUNTS
  filteredAccounts(accounts: BankAccount[]) {
    const q = this.accountSearch.trim().toLowerCase();
    return accounts.filter(
      (a) =>
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.number.toLowerCase().includes(q)
    );
  }

  openCreateAccount() {
    this.modalType = 'account';
    this.modalTitle = 'Create Bank Account';
    this.form.reset({
      id: null,
      name: '',
      number: '',
      price: 0,
      description: '',
      balance: 0
    });
    this.modalVisible = true;
  }

  openEditAccount(a: BankAccount) {
    this.modalType = 'account';
    this.modalTitle = 'Edit Bank Account';
    this.form.patchValue({
      id: a.id,
      name: a.name ?? '',
      number: a.number ?? '',
      price: 0,
      description: '',
      balance: a.balance
    });
    this.modalVisible = true;
  }

  deleteAccount(id: number) {
    if (!confirm('Delete this account?')) return;
    this.svc.deleteAccount(id);
  }

  // modal submit
  submitForm() {
    const v = this.form.value;

    if (this.modalType === 'product') {
      const product: Product = {
        id: v.id!,
        name: v.name!,
        price: Number(v.price),
        description: v.description || ''
      };

      if (v.id) this.svc.updateProduct(product);
      else this.svc.addProduct(product);
    }

    if (this.modalType === 'account') {
      const account: BankAccount = {
        id: v.id!,
        name: v.name!,
        number: v.number!,
        balance: Number(v.balance)
      };

      if (v.id) this.svc.updateAccount(account);
      else this.svc.addAccount(account);
    }

    this.closeModal();
  }

  closeModal() {
    this.modalVisible = false;
    this.modalType = null;
    this.modalTitle = '';
  }

  // merchant
  saveMerchant(m: Merchant) {
    this.svc.saveMerchant(m);
    alert('Merchant profile saved.');
  }

  deleteMerchant() {
    if (!confirm('Delete merchant account? This cannot be undone.')) return;
    this.svc.deleteMerchant();
    alert('Merchant deleted (demo).');
  }
}
