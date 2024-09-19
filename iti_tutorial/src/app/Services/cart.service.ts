import { Injectable } from '@angular/core';
import { ProductViewModel } from '../ViewModels/product-view-model';
import { IProduct } from '../Models/iproduct';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: ProductViewModel[] = [];
  totalPrice: number = 0;
  snackBar: any;
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    this.httpClient.get<ProductViewModel[]>(`${environment.APIUrl}/Cart`).subscribe(c => {
      this.cart = c;
      console.log("this.cart", this.cart)
    })

  }

  getCart(): Observable<ProductViewModel[]> {
    return this.httpClient.get<ProductViewModel[]>(`${environment.APIUrl}/Cart`);
  }

  AddToCart(product: IProduct, neededQuantity: number) {
    let exist = this.cart.find(p => p.product?.id == product?.id);

    let TP = neededQuantity * product.price;
    let productVM: ProductViewModel = {
      product: product,
      neededQuantity: neededQuantity,
      totalPrice: TP
    }

    if (!exist) {
      this.httpClient.post<ProductViewModel>(`${environment.APIUrl}/Cart`, productVM, this.httpOptions).subscribe({
        next: (response) => {
          console.log('Product added to Cart successfully', response);
        },
        error: (error) => {
          console.error('Error adding product to cart', error);
        }
      });
      console.log("productVM", productVM)
      this.cart.push(productVM);
      window.location.reload()
    }
    else {
      // this.RemoveFromCart(productVM);
      exist.neededQuantity = (exist.neededQuantity + neededQuantity) as number;
    }

  }

  RemoveFromCart(product: ProductViewModel) {
    this.cart = this.cart.filter(
      (p) => p.product?.id != product.product?.id
    );
  }

  getTotalPrice(): number {
    this.cart.forEach(element => {
      this.totalPrice += element.totalPrice;
    });
    return this.totalPrice
  }
}