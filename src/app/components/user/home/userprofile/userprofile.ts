import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.css'
})
export class UserprofileComponent implements OnInit{
  user = {
    fullName: '',
    email: '',
    mobile: ''
  };

  constructor(private auth: Auth) {}


  ngOnInit() {
    // Load from localStorage
    const storedEmail = localStorage.getItem('email');
    const storedFullName = localStorage.getItem('fullName');
    const storedMobile = localStorage.getItem('mobile');

    if (storedEmail && storedFullName && storedMobile) {
      this.user.email = storedEmail;
      this.user.fullName = storedFullName;
      this.user.mobile = storedMobile;
    }
  }

 updateProfile() {
  const userId = 1; // replace with true userId as needed
  this.auth.updateProfile(userId, this.user).subscribe({
    next: res => {
      // Update localStorage with new values
      localStorage.setItem('email', this.user.email);
      localStorage.setItem('fullName', this.user.fullName);
      localStorage.setItem('mobile', this.user.mobile);
      console.log('Profile updated:', res);
    },
    error: err => console.error('Error updating profile:', err)
  });
}

}