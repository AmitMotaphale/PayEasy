import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Merchant, MerchantService } from '../../../../services/merchant'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class SettingsComponent {
  merchant: Merchant = {
    merchantName: '',
    contactNumber: '',
    email: '',
    password: '',
  };
  merchantId!: number;
  deletedMessage = '';
  showThankYouMessage = false;

  constructor(private merchantService: MerchantService) {}

  ngOnInit() {
    const merchIdStr = localStorage.getItem('merchantId');
    if (merchIdStr) {
      this.merchantId = Number(merchIdStr);
      this.loadMerchant();
    }
  }

  loadMerchant() {
    this.merchantService.getMerchantById(this.merchantId).subscribe({
      next: (res) => {
        this.merchant = res;
        this.merchant.password = '';
      },
      error: (err) => console.error('Failed to load merchant', err),
    });
  }

 updateProfile() {
    if (!this.validateInputs()) return;

    const updatedMerchant: Merchant = { ...this.merchant };

    // Only send password if it's filled in
    if (!updatedMerchant.password?.trim()) {
      delete updatedMerchant.password;
    }

    this.merchantService.updateMerchant(this.merchantId, updatedMerchant).subscribe({
      next: () => alert('Profile updated successfully.'),
      error: (err) => {
        console.error('Failed to update profile', err);
        alert('Profile update failed.');
      },
    });
  }

  validateInputs(): boolean {
    if (!this.merchant.merchantName.trim()) {
      alert('Merchant name is required');
      return false;
    }
    if (!this.merchant.contactNumber.match(/^[6-9]\d{9}$/)) {
      alert('Contact number must be a 10-digit number starting with 6-9');
      return false;
    }
    if (!this.merchant.email.match(/^\S+@\S+\.\S+$/)) {
      alert('Valid email is required');
      return false;
    }
    return true;
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.merchantService.deleteMerchant(this.merchantId).subscribe({
        next: () => {
          this.showThankYouMessage = true;
          setTimeout(() => {
            // Logout and redirect after showing message
            localStorage.clear();
            window.location.href = '/merchant/login';
          }, 7000); // 7 seconds message display
        },
        error: (err) => {
          console.error('Failed to delete account', err);
          alert('Account deletion failed.');
        },
      });
    }
  }
}
