import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Kempes';

  constructor(private router: Router) {
    
   }

  ngOnInit() {
  }

  onSignUp() {
    this.router.navigate(['signup']);
  }

  onLogin() {
    this.router.navigate(['login']);
  }
}
