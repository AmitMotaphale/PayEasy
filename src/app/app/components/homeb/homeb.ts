import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homeb',
  standalone: true,
  templateUrl: './homeb.html',
  styleUrls: ['./homeb.css'],
  imports: [RouterModule,CommonModule]
})
export class HomebComponent {
  profileMenuVisible = false;
  userName = 'BusinessUser';

  constructor(private router: Router) {}

  toggleProfileMenu() {
    this.profileMenuVisible = !this.profileMenuVisible;
  }

  navigateTo(route: string) {
    this.profileMenuVisible = false;
    this.router.navigate([route]);
  }
}
