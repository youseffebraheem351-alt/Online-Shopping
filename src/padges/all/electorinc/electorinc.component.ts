import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllService } from '../../../servies/all.service';
import { Inter } from '../../../interfase/inter';
import { Subscription } from 'rxjs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeartService } from '../../../servies/heart.service';
import { CartService } from '../../../servies/cart.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-electorinc',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './electorinc.component.html',
  styleUrls: ['./electorinc.component.css']
})
export class ElectorincComponent implements OnInit, OnDestroy {
  Elector!: Inter[];
  elecSub!: Subscription;
  wishlist: any[] = [];
  wishlistSub!: Subscription;

  constructor(
    private _AllService: AllService,
    private _HeartService: HeartService,
    private _CartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.elecSub = this._AllService.electoric().subscribe({
      next: (data) => {
        this.Elector = data;
      }
    });

    this.wishlistSub = this._HeartService.wishlistItems.subscribe(items => {
      this.wishlist = items;
    });
  }

  ngOnDestroy(): void {
    this.elecSub?.unsubscribe();
    this.wishlistSub?.unsubscribe();
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

  addToCart(item: Inter) {
    this._CartService.addToCart(item);
  }

  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
}
