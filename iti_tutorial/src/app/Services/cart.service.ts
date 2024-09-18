import { Injectable } from '@angular/core';
import { ProductViewModel } from '../ViewModels/product-view-model';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: ProductViewModel[] = [];
  totalPrice: number = 0;
  constructor() { }

  getCart() {
    return this.cart;
  }

  addToCart(product: ProductViewModel) {
    debugger;
    console.log("cart", this.cart)
    console.log("product", product)

    let exist = this.cart.find(p => p.product?.id == product.product?.id);
    console.log(exist);
    if (exist) {
      exist.neededQuantity = (exist.neededQuantity + product.neededQuantity) as number;
      console.log("exist", exist.neededQuantity)
    }
    else {
      this.cart.push(product);
    }

  }

  removeFromCart(productViewModel: ProductViewModel) {
    this.cart = this.cart.filter(
      (p) => p.product?.id != productViewModel.product?.id
    );
  }

  getTotalPrice(): number {
    this.cart.forEach(element => {
      this.totalPrice += element.totalPrice;
    });
    return this.totalPrice
  }
}