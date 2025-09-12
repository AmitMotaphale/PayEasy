import { Component } from '@angular/core';
import { UserNavbar } from "../../shared/user-navbar/user-navbar";

@Component({
  selector: 'app-home',
  imports: [UserNavbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
