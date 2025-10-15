import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CartService } from '../../../servies/cart.service';
import { HeartService } from '../../../servies/heart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isDarkMode = false;
  mobileMenuOpen = false;
  cartCount = 0;
  wishlistCount = 0;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private _CartService: CartService,
    private HeartService: HeartService
  ) {}

  ngOnInit(): void {
    this._CartService.cartItems.subscribe((items: any[]) => {
      this.cartCount = items.length;
    });

    this.HeartService.wishlistItems.subscribe((items: any[]) => {
      this.wishlistCount = items.length;
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'bg-white');
      this.renderer.addClass(document.body, 'bg-gray-900');
    } else {
      this.renderer.removeClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'bg-gray-900');
      this.renderer.addClass(document.body, 'bg-white');
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isInWishlist(productId: number): boolean {
    return this.HeartService.isInWishlist(productId);
  }

  toggleWishlist(product: any) {
    if (this.HeartService.isInWishlist(product.id)) {
      this.HeartService.removeFromWishlist(product.id);
    } else {
      this.HeartService.addToWishlist(product);
    }
  }
}
