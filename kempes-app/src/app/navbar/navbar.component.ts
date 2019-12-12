import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log("Navbar init: authService.showProfileMenu= " + this.authService.showProfileMenu);
  }

  //logoutClicked(event: Event): void {
  logoutClicked(): void {
    console.log("Log out clicked");
    this.authService.logout();
    console.log("user logged in ??=" + this.authService.isLoggedIn());
    //this.router.navigate(['/']);
  }
}
