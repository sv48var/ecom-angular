import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { URLs } from '../../shared/constants/endPointURLs';

@Component({
  selector: 'my-project-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchCart();
  }

  fetchCart(): void {
    this.apiService.get(URLs.get_cart).subscribe(
      (response: any) => {
        this.cartItems = response;
        this.calculateTotalPrice();
      },
      (error: any) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  updateQuantity(sku: string, newQuantity: number): void {
    this.updateCartQuantity(sku, newQuantity);
  }

  updateCartQuantity(sku: string, newQuantity: number): void {
    this.apiService.put(`${URLs.update_cart_quantity}${sku}`, { quantity: newQuantity }).subscribe(
      () => {
        this.fetchCart();
      },
      (error: any) => {
        console.error('Error updating quantity:', error);
      }
    );
  }

  removeFromCart(sku: string): void {
    this.apiService.delete(`${URLs.remove_cart}${sku}`).subscribe(
      () => {
        this.fetchCart();
      },
      (error: any) => {
        console.error('Error removing from cart:', error);
      }
    );
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }

  noOfCartItems(): number {
    return this.cartItems.length;
  }

  trackByProductId(index: number, item: any): string {
    return item.product;
  }
}
