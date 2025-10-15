import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllService } from '../../servies/all.service';
import { Inter } from '../../interfase/inter';
import { Subscription } from 'rxjs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../servies/cart.service';
import { HeartService } from '../../servies/heart.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [NgClass , RouterLink , RouterLinkActive],
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit, OnDestroy {
  all!: Inter[];
  allSub!: Subscription;
  wishlist: any[] = [];
  wishlistSub!: Subscription;

  activeViewId: number | null = null;

  constructor(
    private _AllService: AllService,
    private router: Router,
    private _CartService: CartService,
    private _HeartService: HeartService
  ) {}

  ngOnInit(): void {
    this.allSub = this._AllService.getdata().subscribe({
      next: (data) => {
        this.all = data;
      }
    });

    // ✅ استمع للتغيرات في القلوب
    this.wishlistSub = this._HeartService.wishlistItems.subscribe(items => {
      this.wishlist = items;
    });
  }

  ngOnDestroy(): void {
    this.allSub?.unsubscribe();
    this.wishlistSub?.unsubscribe();
  }

  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  addToCart(item: Inter) {
    this._CartService.addToCart(item);
  }

  isInWishlist(id: number): boolean {
    return this.wishlist.some(item => item.id === id);
  }

  toggleWishlist(item: Inter) {
    if (this._HeartService.isInWishlist(item.id)) {
      this._HeartService.removeFromWishlist(item.id);
    } else {
      this._HeartService.addToWishlist(item);
    }
  }
}
