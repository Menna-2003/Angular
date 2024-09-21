import { Injectable } from '@angular/core';
import { ProductViewModel } from '../ViewModels/product-view-model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: ProductViewModel[] = [];
  totalPrice: number = 0;
  httpOptions: any;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
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

  getProductById(id: number): Observable<ProductViewModel> {
    return this.httpClient.get<ProductViewModel>(
      `${environment.APIUrl}/Cart/${id}`
    ).pipe(
      catchError((error) => {
        console.error('Error fetching product by ID:', error);
        return throwError(error); // Rethrow the error for further handling if necessary
      })
    );
  }

  UpdateProductQuantity(product: ProductViewModel): Observable<ProductViewModel> {
    this.UpdatedCartNotification()
    return this.httpClient.put<ProductViewModel>(
      `${environment.APIUrl}/Cart/${product.id}`,
      product,
      {
        headers: this.httpOptions.headers,
        observe: 'body'  // This option is actually the default, so you can omit it if you prefer.
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  AddToCart(product: ProductViewModel): Observable<ProductViewModel> {
    this.AddToCartNotification()
    return this.httpClient.post<ProductViewModel>(`${environment.APIUrl}/Cart`, JSON.stringify(product, this.httpOptions));
  }

  RemoveFromCart(product: ProductViewModel): Observable<any> {
    this.RemovedFromCartNotification()
    return this.httpClient.delete(`${environment.APIUrl}/Cart/${product.id}`, this.httpOptions)
  }

  private UpdatedCartNotification() {
    this.snackBar.open(`Product quantity has been Updated successfully!`, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['AddedToFav'],
    });
  }

  private AddToCartNotification() {
    this.snackBar.open(`Product has been added successfully!`, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['AddedToFav'],
    });
  }

  private RemovedFromCartNotification() {
    this.snackBar.open(`Product removed from Cart!`, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['RemovedFromFav'],
    });
  }

  getTotalPrice(): number {
    // this.cart.forEach(element => {
    //   this.totalPrice += element.totalPrice;
    // });
    return this.totalPrice
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}