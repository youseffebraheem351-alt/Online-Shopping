import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllService } from '../../../servies/all.service';
import { Inter } from '../../../interfase/inter';
import { Subscription } from 'rxjs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../servies/cart.service';
import { HeartService } from '../../../servies/heart.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit, OnDestroy {
  men!: Inter[];
  menSub!: Subscription;
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
    this.menSub = this._AllService.mendata().subscribe({
      next: (data) => {
        this.men = data;
      }
    });

    // استمع للتغيرات في القلوب
    this.wishlistSub = this._HeartService.wishlistItems.subscribe(items => {
      this.wishlist = items;
    });
  }

  ngOnDestroy(): void {
    this.menSub?.unsubscribe();
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
