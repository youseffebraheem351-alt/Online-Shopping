import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AllComponent } from "../padges/all/all.component";
import { NavbarComponent } from '../padges/all/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,        // ✅ ده المهم علشان routerLink يشتغل
    RouterOutlet,
    
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showFullNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        this.showFullNavbar = !(currentUrl.includes('/login') || currentUrl.includes('/register'));
      }
    });
  }
}
