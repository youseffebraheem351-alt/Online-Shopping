import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../servies/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule,  NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // ✅ تحميل البيانات من السيرفيس عند فتح الصفحة
    this.cartService.getItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  // ✅ تحديث كمية منتج معين
  updateQuantity(index: number, quantity: number) {
    if (quantity < 1) return;
    this.cartService.updateQuantity(index, quantity);
  }

  // ✅ حذف منتج من السلة
  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  // ✅ حساب إجمالي السعر
  getTotal(): string {
    return this.cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  }

  // ✅ تفريغ السلة بالكامل (اختياري)
  clearCart() {
    this.cartService.clearCart();
  }
}
