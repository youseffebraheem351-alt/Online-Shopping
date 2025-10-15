import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeartService } from '../../servies/heart.service';
import { Inter } from '../../interfase/inter';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-heart',
  standalone: true,
  imports: [NgFor, NgIf ,RouterLink],
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css']
})
export class HeartComponent implements OnInit, OnDestroy {
  wishlist: Inter[] = [];
  wishlistSub!: Subscription;
cartItems: any;

  constructor(private _HeartService: HeartService) {}

  ngOnInit(): void {
    this.wishlistSub = this._HeartService.wishlistItems.subscribe(items => {
      this.wishlist = items;
    });
  }

  ngOnDestroy(): void {
    this.wishlistSub?.unsubscribe();
  }

  removeFromWishlist(id: number) {
    this._HeartService.removeFromWishlist(id);
  }
}
