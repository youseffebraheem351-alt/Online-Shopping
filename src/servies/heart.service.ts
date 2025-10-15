import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeartService {
  private wishlist: any[] = [];
  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlistItems = this.wishlistSubject.asObservable();

  constructor() {
    this.loadWishlistFromStorage();
  }

  private loadWishlistFromStorage() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        this.wishlist = JSON.parse(storedWishlist);
        this.wishlistSubject.next(this.wishlist);
      }
    }
  }

  addToWishlist(product: any) {
    if (!this.isInWishlist(product.id)) {
      this.wishlist.push(product);
      this.updateWishlist();
    }
  }

  removeFromWishlist(productId: number) {
    this.wishlist = this.wishlist.filter(item => item.id !== productId);
    this.updateWishlist();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlist.some(item => item.id === productId);
  }

  clearWishlist() {
    this.wishlist = [];
    this.updateWishlist();
  }

  private updateWishlist() {
    this.wishlistSubject.next(this.wishlist);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }
  }
}
