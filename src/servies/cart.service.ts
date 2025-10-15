import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart_items';
  private items: any[] = this.loadFromLocalStorage();
  cartItems = new BehaviorSubject<any[]>(this.items);

  constructor() {}

  private loadFromLocalStorage(): any[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.cartKey);
    return data ? JSON.parse(data) : [];
  }

  private saveToLocalStorage(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
  }

  addToCart(item: any) {
    const existingItem = this.items.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this.saveToLocalStorage();
    this.cartItems.next(this.items);
  }

  getItems() {
    return this.cartItems.asObservable();
  }

  updateQuantity(index: number, quantity: number) {
    if (this.items[index]) {
      this.items[index].quantity = quantity;
      this.saveToLocalStorage();
      this.cartItems.next(this.items);
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.saveToLocalStorage();
    this.cartItems.next(this.items);
  }

  clearCart() {
    this.items = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.cartKey);
    }
    this.cartItems.next([]);
  }
}