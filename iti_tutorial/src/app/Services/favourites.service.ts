import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  Favourites: IProduct[] = []
  httpOptions: any;

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient, private ProductService: ProductsService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getFavourites(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.APIUrl}/Favourites`);
  }

  addToFavourites(product: IProduct): Observable<IProduct> {
    this.AddToFavouritesNotification()
    return this.httpClient.post<IProduct>(`${environment.APIUrl}/Favourites`, JSON.stringify(product, this.httpOptions));
  }

  removeFromFavourites(product: IProduct): Observable<any> {
    this.RemovedFromFavouritesNotification()
    const url = `${environment.APIUrl}/Favourites/${product.id}`;
    return this.httpClient.delete(url, this.httpOptions)
  }

  private AddToFavouritesNotification() {
    this.snackBar.open(`Product has been added successfully!`, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['AddedToFav'],
    });
  }
  
  private RemovedFromFavouritesNotification() {
    this.snackBar.open(`Product removed from favourites!`, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['RemovedFromFav'],
    });
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
